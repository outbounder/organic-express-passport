var passport = require('passport')

module.exports = function(User, config) {

  if(User.authenticate && User.serializeUser && User.deserializeUser) {
    var LocalStrategy = require('passport-local').Strategy
    passport.use(new LocalStrategy(User.authenticate()))
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
  }

  if(config.facebook) {
    var FacebookStrategy = require('passport-facebook').Strategy
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
      },
      User.findByOAuthIDOrCreate
    ))
  }

  if(config.twitter) {
    var TwitterStrategy = require('passport-twitter').Strategy
    passport.use(new TwitterStrategy({
       consumerKey: config.twitter.consumerKey,
       consumerSecret: config.twitter.consumerSecret,
       callbackURL: config.twitter.callbackURL
     },
     User.findByOAuthIDOrCreate
    ))
  }

  if(config.github) {
    var GithubStrategy = require('passport-github').Strategy
    passport.use(new GithubStrategy({
       clientID: config.github.clientID,
       clientSecret: config.github.clientSecret,
       callbackURL: config.github.callbackURL
     },
     User.findByOAuthIDOrCreate
    ))
  }

  if(config.google) {
    var GoogleStrategy = require('passport-google').Strategy
    passport.use(new GoogleStrategy({
       returnURL: config.google.returnURL,
       realm: config.google.realm
     },
     User.findByOAuthIDOrCreate
    ))  
  }
}