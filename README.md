# organic-express-passportjs

Organelle wrapper of [passportjs](https://github.com/jaredhanson/passport)

# dna

    {
      "reactOn": "ExpressServer",
      "initPassport": "test/data/initPassport.js",
      "mongooseUser": "test/data/mongooseUser.js",
      "oauth": {
        "facebook": {
          "clientID": 'get_your_own',
          "clientSecret": 'get_your_own',
          "callbackURL": 'http://127.0.0.1:1337/auth/facebook/callback'
        },
        "twitter": {
          "consumerKey": 'get_your_own',
          "consumerSecret": 'get_your_own',
          "callbackURL": "http://127.0.0.1:1337/auth/twitter/callback"
        },
        "github": {
          "clientID": 'get_your_own',
          "clientSecret": 'get_your_own',
          "callbackURL": "http://127.0.0.1:1337/auth/github/callback"
        },
        "google": {
          "returnURL": 'http://127.0.0.1:1337/auth/google/callback',
          "realm": 'http://127.0.0.1:1337'
        }
      }
    }

### `reactOn` property

Should be either `ExpressServer` chemical with [expected structure](https://github.com/outbounder/organic-express-server#emitready-chemical) or array of chemicals where the first one is mapped as `ExpressServer` chemical.

## example initPassport.js

    var passport = require("passport")
    var LocalStrategy = require('passport-local').Strategy;
    var User = require("models/User")

    passport.use(new LocalStrategy(User.authenticate()))
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())

## example User mongoose model

    var mongoose = require('mongoose')
    var passportLocalMongoose = require('passport-local-mongoose')

    // create a user model
    var schema = new mongoose.Schema({
      schemaname: String,
      password: String,
      oauthID: Number,
      displayName: String,
      created: Date,
      refreshToken: String
    });

    schema.plugin(passportLocalMongoose);

    schema.static("findByOAuthIDOrCreate", function(accessToken, refreshToken, profile, done) {
      var self = this
      this.findOne({ oauthID: profile.id }, function(err, user) {
        if(err) return done(err)
        if (!err && user != null) return done(null, user)
        
        self.create({
          oauthID: profile.id,
          displayName: profile.displayName,
          created: Date.now(),
          refreshToken: refreshToken
        }, done)
      })
    })

    module.exports = mongoose.model('User', schema);