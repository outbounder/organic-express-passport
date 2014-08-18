module.exports = function(){
  var passport = require("passport")
  var LocalStrategy = require('passport-local').Strategy;
  var User = require("./mongooseUser")

  passport.use(new LocalStrategy(User.authenticate()))
  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())  
}
