// npm packages
import {Strategy as GitHubStrategy} from 'passport-github2';
import {Strategy as LocalStrategy} from 'passport-local';

// our packages
import User from '../models/users';
import configAuth from './auth';

module.exports = (passport) => {
  // passportjs with oauth always requires sessions for the initial oauth handshake
  // the github strategy uses oauth thus sessions are required
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  // use GitHubStrategy
  passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL,
  },
  (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      // Find user with matching github id
      User.findOne({'github.id': profile.id}, (err, user) => {
        if (err) {
          console.log('error getting data from github');
          return done(err);
        }
        // If user exists in our db return user
        if (user) {
          return done(null, user);
        }

        // Get github info
        const newUser = new User();

        newUser.github.id = profile.id;
        newUser.github.username = profile.username;
        newUser.github.displayName = profile.displayName;
        newUser.github.publicRepos = profile._json.public_repos;
        newUser.nbrClicks.clicks = 0;
        // Save github info to db
        newUser.save((e) => {
          if (e) {
            throw e;
          }
          return done(null, newUser);
        });
      });
    });
  }));

  // use LocalStragegy
  // Using named strategies, one for login and one for signup
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(() => {
    // If email already used by a user
      User.findOne({'local.email': email}, (err, user) => {
        if (err) {
          return done(err);
        }
        // Can't have two users with same email
        if (user) {
          return done(null, false, {message: 'Email already in use.'});
        }
        // if new email, create new user
        const newUser = new User();

        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        newUser.save((e) => {
          if (e) throw e;
          return done(null, newUser);
        });
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    process.nextTick(() => {
      User.findOne({'local.email': email}, (err, user) => {
        if (err) return done(err);

        if (!user) {
          return done(null, false, {message: 'User does not exist'});
        }

        if (!user.validPassword(password)) {
          return done(null, false, {message: 'Password is incorrect'});
        }

        return done(null, user);
      });
    });
  }));
};
