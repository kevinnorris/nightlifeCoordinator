import express from 'express';
import jwt from 'jsonwebtoken';

import 'es6-promise/auto';
import 'isomorphic-fetch';

import User from './models/users';
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
      res.json(json);
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
