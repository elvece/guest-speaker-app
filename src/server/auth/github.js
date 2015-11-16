var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var models = require('../models/index');


passport.use(new GitHubStrategy({
  clientID: process.env.githubClientID || "blah",
  clientSecret: process.env.githubClientSecret || "blah",
  callbackURL: process.env.githubCallbackURL || "blah"
},
function(accessToken, refreshToken, profile, done) {
  models.User.findOne({
    where: {email: profile._json.email}
  }).then(function(user) {
    if (user) {
      return done(null, user, {message: 'Thanks for logging in!'});
    } else {
      models.User.create({
        email: profile._json.email
      }).then(function(user) {
        return done(null, user, {message: 'Thanks for logging in!'});
      }).catch(function (err) {
        return done(err, {message: 'Something went wrong!'});
      });
    }
  }).catch(function (err) {
    return done(err, {message: 'Something went wrong!'});
  });
}));

// serialize and deserialize user (passport)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(user, done) {
  models.User.findOne({
    where: {id:user.id}
  }).then(function(user) {
    return done(null, user);
  });
});

module.exports = passport;
