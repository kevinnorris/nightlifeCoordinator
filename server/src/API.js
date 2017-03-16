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
        return res.json({success: false, message: 'Failed to authenticate token.'});
      }
      // if all is well, save to request fo use in other routes
      req.decoded = decoded;
      return next();
    });
  } else {
    // no token
    return res.status(403).json({success: false, message: 'No token provided.'});
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

const concatAttendance = (businessData, userId = null, callback) => {
  const names = businessData.map(business => business.name);

  // Select all business records whos name coresponds to one of business in businessData
  Business.find({name: {$in: names}})
    .select({})
    .exec((err, businesses) => {
      if (err) {
        console.log('error finding businesses, message:', err.message);
      } else {
        console.log(businesses);

        const bisToRemove = [];
        let now;
        let userToRemove;
        let numGoing;
        let userGoing;
        for (let i = 0; i < businesses.length; i += 1) {
          now = Date.now();
          userToRemove = [];
          numGoing = 0;
          userGoing = false;

          for (let j = 0; j < businesses[i].usersGoing; j += 1) {
            // If the current time is past the expiration date, add to userToRemove
            if (businesses[i].usersGoing[j].expireDate > now) {
              userToRemove.push(businesses[i].usersGoing[j]._id);
            } else {
              numGoing += 1;
              // If a userId has been provided and this entry coresponds to the user
              if (userId && businesses[i].usersGoing[j].userId === userId) {
                userGoing = true;
              }
            }
          }

          if (userToRemove.length === businesses[i].usersGoing.length) {
            bisToRemove.push(businesses[i]._id);
          } else if (userToRemove > 0) {
            // Call db to remove users from given business
          }
        }
        if (bisToRemove.length > 0) {
          // Call db to remove businesses that have no users associated with them
        }
      }
    });
};

/*
  API routes
  ------------------------
*/
const apiRoutes = express.Router();

apiRoutes.get('/yelpSearchData', (req, res) => {
  const dummyLocation = 'Auckland';
  const searchUrl= `https://api.yelp.com/v3/businesses/search?term=bar&sort_by=best_match&location=${dummyLocation}`;

  yelpAccess((token) => {
    fetch(searchUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => response.json())
    .then((json) => {
      const formated = formatData(json);
      res.json({success: true, data: formated});
    }).catch(err => res.json({success: false, error: err.message}));
  });
});

apiRoutes.get('/users', tokenVerify, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log('error with User.find');
      throw err;
    }
    res.json({success: true, data: users});
  });
});

apiRoutes.get('/addClick', tokenVerify, (req, res) => {
  // Update the number of clicks by 1 for the given user
  User.update(
    {_id: req.query.id},
    {$inc: {'nbrClicks.clicks': 1}},
    (err) => {
      if (err) {
        return res.json({success: false, message: err.message});
      }
      return res.json({success: true});
    },
  );
});

apiRoutes.get('/getClicks', tokenVerify, (req, res) => {
  User.findById(req.query.id, (err, user) => {
    if (err) {
      return res.json({success: false, message: err.message});
    }
    return res.json({success: true, clicks: user.nbrClicks.clicks});
  });
});

apiRoutes.get('/resetClicks', tokenVerify, (req, res) => {
  User.update(
    {_id: req.query.id},
    {'nbrClicks.clicks': 0},
    (err) => {
      if (err) {
        return res.json({success: false, message: err.message});
      }
      return res.json({success: true});
    },
  );
});

export default apiRoutes;
