import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import popupTools from 'popup-tools';
import 'dotenv/config';

import apiRoutes from './API';

require('./config/passport')(passport);

const app = express();

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

// add body parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// add passport.js
app.use(passport.initialize());

// set static files path
app.use(express.static(path.resolve('./client/public')));

/*
  Github authentication
  ------------------------
*/
app.route('/auth/github')
  .get(passport.authenticate('github'));

app.route('/auth/github/callback')
  .get(passport.authenticate('github'), (req, res) => {
    if (!req.user) {
      return res.json({success: false, message: 'Github authentication error.'});
    }
    // Create and send json web token
    const token = jwt.sign({
      sub: req.user.github.id,
      iss: process.env.APP_URL,
      iat: (new Date().getTime()),
    }, process.env.JWT_SECRET, {
      expiresIn: '4h',
    });

    return res.end(popupTools.popupResponse({
      success: true,
      token,
      user: req.user,
    }));
  });

/*
  Set API
  ------------------------
*/
app.use('/api', apiRoutes);

/*
  Generic routes
  ------------------------
*/
app.get('/*', (req, res) => {
  res.status(200).sendFile(path.resolve('./client/public/index.html'));
});

// Start express server
app.listen(process.env.PORT || 8080);
