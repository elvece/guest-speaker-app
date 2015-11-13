var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var models = require('../models/index');


passport.use(new GitHubStrategy({
  clientID: process.env.githubClientID,
  clientSecret: process.env.githubClientSecret,
  callbackURL: process.env.githubCallbackURL
},
function(accessToken, refreshToken, profile, done) {
  models.User.create({
    email: profile._json.email
  }).then(function(user) {
    return done(null, user);
  });
}));

// serialize and deserialize user (passport)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  models.User.findOne({
    where: {id:user.id}
  }).then(function(user) {
    return done(null, user);
  });
});

module.exports = passport;
