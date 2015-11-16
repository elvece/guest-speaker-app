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
      return done(null, user);
    } else {
      models.User.create({
        email: profile._json.email
      }).then(function(user) {
        return done(null, user);
      }).catch(function (err) {
        return done(err);
      });
    }
  }).catch(function (err) {
    return done(err);
  });
}));

// serialize and deserialize user (passport)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  models.User.findOne({
    where: {id:id}
  }).then(function(user) {
    return done(null, user);
  });
});

module.exports = passport;
