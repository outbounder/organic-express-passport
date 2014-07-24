var path = require("path")
var passport = require("passport")

module.exports = function(plasma, dna){
  if(dna.initPassport)
    require(path.join(process.cwd(), dna.initPassport))
  if(dna.mongooseUser)
    require("./mongoose-setup")(require(path.join(process.cwd(),dna.mongooseUser)), dna.oauth || {})
  plasma.on(dna.reactOn, function(c){
    var app = c.data || c[0].data
    app.use(passport.initialize())
    app.use(passport.session())
  })
}