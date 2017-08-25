var models = require('../models')
var express = require('express')
var router = express.Router()

router.post('/signup', function (req, res, next) {
  var user = {
    Name: req.body.name,
    Email: req.body.email,
    Pass: req.body.pass,
    Num: req.body.num
  }
// var UserReg = mongoose.model('UserReg', RegSchema)
/*UserReg.create(user, function(err, newUser) {
   if(err) return next(err)
   req.session.user = email
   return res.send('Logged In!')
});*/
})

router.post('/login', function (req, res, next) {
  var username = req.body.username
  var pass = req.body.password

  models.User.findOne({where: {username: username, password: pass}}).then((user, err) => {
    if (err) return next(err)
    if (!user) return res.send('Not logged in!')

    req.session.user = user.username
    return res.redirect('/')
  })
})

router.post('/is-logged-in', function (req, res, next) {
  var username = req.body.username
  var pass = req.body.password

  req.session.user ? res.json({status: 'connected'}) : res.json({status: 'not-connected'})
})

router.get('/logout', function (req, res) {
  req.session.user = null
})

module.exports = router
