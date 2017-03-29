/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
import express from 'express';
import jwt from 'jsonwebtoken';

import 'es6-promise/auto';
import 'isomorphic-fetch';

import User from './models/users';
import Business from './models/businesses';
import yelpAccess from './utils/yelpAccess';

/*
  User Json Web Token verification middleware
  ----------------------
*/
const tokenVerify = (req, res, next) => {
  // check header or url params or post params for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // console.log('token:', token, 'id: ', req.query.id);

  // decode token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({success: false, message: 'Failed to authenticate token.'});
      } else {
        // if all is well, save to request for use in other routes
        req.decoded = decoded;
        return next();
      }
    });
  } else {
    // no token
    res.status(403).json({success: false, message: 'No token provided.'});
  }
};

/* The api currently has (at least?)3 different sizes of each image
    /ms.jpg   (full size)
    /o.jpg    (thumbnail 100x100)
    /ls.jpg   (squared 250x250)
*/
const formatData = yelpApiResponse => (
  yelpApiResponse.businesses.map(business => (
    {
      name: business.name,
      url: business.url,
      imgUrl: `${business.image_url.slice(0, business.image_url.lastIndexOf('/'))}/ls.jpg`,
      rating: business.rating,
      reviewCount: business.review_count,
      price: business.price,
    }
  ))
);

/**
 * Adds numGoing and userGoing parameters to each document in the businessData array provided
 * Also removes all expired users, and any business without active users from the DB
 * @param {Array} businessData  Array of documents returned from Business schema
 * @param {String} userId       Id of user in User schema
 * @param {Function} callback   function to call with updated data
 */
const concatAttendance = (businessData, callback, userId = null) => {
  // Create a copy of the data, with numGoing and userGoing params set to default
  const updatedData = businessData.map(business => (
    {
      ...business,
      numGoing: 0,
      userGoing: false,
      usersAttending: [],
    }
  ));

  const names = businessData.map(business => business.name);
  let error = null;
  // Select all business records whos name coresponds to one of business in businessData
  Business.find({name: {$in: names}})
    .select({})
    .exec((err, businesses) => {
      if (err) {
        error = `error finding businesses, message: ${err.message}`;
      } else {
        const bisToRemove = [];
        for (let i = 0; i < businesses.length; i += 1) {
          const now = Date.now();
          const userToRemove = [];
          let numGoing = 0;
          let userGoing = false;      // Is the user that made the request going
          const usersAttending = [];  // array of id's of users going

          for (let j = 0; j < businesses[i].usersGoing.length; j += 1) {
            // If the current time is past the expiration date, add to userToRemove
            if (businesses[i].usersGoing[j].expireDate < now) {
              userToRemove.push(businesses[i].usersGoing[j]._id);
            } else {
              numGoing += 1;
              usersAttending.push(businesses[i].usersGoing[j].userId);
              // If a userId has been provided and this entry coresponds to the user
              if (userId && businesses[i].usersGoing[j].userId === userId) {
                userGoing = true;
              }
            }
          }

          // If all users are to be removed, add it to businesses to be removed
          if (userToRemove.length === businesses[i].usersGoing.length) {
            bisToRemove.push(businesses[i]._id);
          } else if (userToRemove.length > 0) {
            // call db to remove users from given business
            Business.update({_id: businesses[i]._id}, {$pull: {usersGoing: {_id: {$in: userToRemove}}}}, (e) => {
              if (e) {
                error = `error removing expired users from ${businesses[i].name}`;
              }
            });
          }

          // if non-default values, set updatedData
          if (numGoing > 0) {
            const dataIndex = updatedData.findIndex(element => (
              element.name === businesses[i].name
            ));
            updatedData[dataIndex].numGoing = numGoing;
            updatedData[dataIndex].userGoing = userGoing;
            updatedData[dataIndex].usersAttending = usersAttending;
          }
        }

        if (bisToRemove.length > 0) {
          // Call db to remove businesses that have no users associated with them
          Business.remove({_id: {$in: bisToRemove}}, (e) => {
            if (e) {
              error = 'error removing businesses';
            }
          });
        }
      }
      if (error) {
        callback({success: false, error});
      } else {
        callback({success: true, data: updatedData});
      }
    });
};

/*
  API routes
  ------------------------
*/
const apiRoutes = express.Router();

apiRoutes.get('/yelpSearchData', (req, res) => {
  if (!req.query.searchTerm) {
    return res.json({success: false, error: 'No search term provided'});
  }
  const searchUrl = `https://api.yelp.com/v3/businesses/search?term=bar&sort_by=best_match&location=${req.query.searchTerm}`;

  return yelpAccess((token) => {
    fetch(searchUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => response.json())
    .then((json) => {
      const formated = formatData(json);
      // Concat attendance data to the formated data
      if (req.query.userId) {
        concatAttendance(formated, data => (
          res.json(data)
        ), req.query.userId);
      } else {
        concatAttendance(formated, data => (
          res.json(data)
        ));
      }
    }).catch(err => res.json({success: false, error: err.message}));
  });
});

apiRoutes.post('/going', tokenVerify, (req, res) => {
  if (!req.body.businessName || !req.body.userId || !req.body.expireDate) {
    return res.json({success: false, error: 'Required parameters not sent'});
  }
  let error = null;
  Business.findOne({name: req.body.businessName})
    .select({})
    .exec((err, business) => {
      if (err) {
        error = `error finding business, message: ${err.message}`;
      } else {
        if (business) {
          // If user is not yet going
          if (business.usersGoing.findIndex(user => user.userId === req.body.userId) === -1) {
            // push user to users going
            Business.update(
              {_id: business._id},
              {$push: {
                usersGoing: {userId: req.body.userId, expireDate: req.body.expireDate},
              }},
              (er) => {
                if (err) {
                  error = `error adding user to business, message: ${er.message}`;
                }
              },
            );
          }
        } else {
          // create new business with user in users going
          const newBusiness = new Business();

          newBusiness.name = req.body.businessName;
          newBusiness.usersGoing = [{userId: req.body.userId, expireDate: req.body.expireDate}];

          newBusiness.save((e) => {
            if (e) {
              error = `error saving business, message: ${e.message}`;
            }
          });
        }
      }
    });
  if (error) {
    res.json({success: false, error});
  } else {
    res.json({success: true});
  }
});

apiRoutes.post('/notGoing', tokenVerify, (req, res) => {
  if (!req.body.businessName || !req.body.userId) {
    return res.json({success: false, error: 'Required parameters not sent'});
  }
  // Find one and update business with buisiness name where userId is in one of the elements in userGoing
  return Business.findOneAndUpdate({name: req.body.businessName, 'usersGoing.userId': req.body.userId},
    {$pull: {usersGoing: {userId: req.body.userId}}}, (err, doc) => {
      if (err) {
        return res.json({success: false, error: err.message});
      }

      if (doc) {
        return res.json({success: true});
      }
      return res.json({success: false, error: 'No document found'});
    });
});

// For debugging
apiRoutes.get('/businesses', (req, res) => {
  Business.find({}, (err, businesses) => {
    if (err) {
      return res.json({success: false, error: err.message});
    }
    return res.json({success: true, businesses});
  });
});
// For debugging
apiRoutes.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.json({success: false, error: err.message});
    }
    return res.json({success: true, users});
  });
});

apiRoutes.get('/deleteBiz', (req, res) => {
  Business.remove({}, (err) => {
    if (err) {
      return res.json({success: false, error: err.message});
    }
    res.json({success: true});
  });
});

// For debugging
apiRoutes.get('/deleteAll', (req, res) => {
  Business.remove({}, (err) => {
    if (err) {
      return res.json({success: false, error: err.message});
    }
    User.remove({}, (e) => {
      if (e) {
        return res.json({success: false, error: e.message});
      }
      return res.json({success: true});
    });
  });
});

export default apiRoutes;
