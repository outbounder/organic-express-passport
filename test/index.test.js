var expect = require("chai").expect
var Organelle = require("../index")
var Plasma = require("organic-plasma")

describe("organic-express-passportjs", function(){
  it("constructs", function(){
    var plasma = new Plasma()
    var mockExpressServer = {
      use: function(){}
    }
    var instance = new Organelle(plasma, {
      initPassport: "test/data/initPassport.js",
      mongooseUser: "test/data/mongooseUser.js",
      reactOn: "ExpressServer",
      oauth: {
        facebook: {
          clientID: 'get_your_own',
          clientSecret: 'get_your_own',
          callbackURL: 'http://127.0.0.1:1337/auth/facebook/callback'
        },
        twitter: {
          consumerKey: 'get_your_own',
          consumerSecret: 'get_your_own',
          callbackURL: "http://127.0.0.1:1337/auth/twitter/callback"
        },
        github: {
          clientID: 'get_your_own',
          clientSecret: 'get_your_own',
          callbackURL: "http://127.0.0.1:1337/auth/github/callback"
        },
        google: {
          returnURL: 'http://127.0.0.1:1337/auth/google/callback',
          realm: 'http://127.0.0.1:1337'
        }
      }
    })
    plasma.emit({
      type: "ExpressServer",
      data: mockExpressServer
    })
  })
})