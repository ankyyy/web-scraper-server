var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
const { getAnchorTags } = require('./scrape');
// var User = mongoose.model('User');
// var auth = require('../auth');

const handler = async function ({ url }) {
    const result = await getAnchorTags(url.trim().replace(/\/$/, ''))
    return { url, result };
}

router.post('/scrape-website', async function (req, res) {
    try {
        console.log(req.body)
        const result = await handler(req.body)
        res.status(200).json(result)
    }
    catch (e) {
        console.log(e)
        res.status(500).statusMessage('internal server error')
    }
});


// router.post('/users/login', function(req, res, next){
//   if(!req.body.user.email){
//     return res.status(422).json({errors: {email: "can't be blank"}});
//   }

//   if(!req.body.user.password){
//     return res.status(422).json({errors: {password: "can't be blank"}});
//   }

//   passport.authenticate('local', {session: false}, function(err, user, info){
//     if(err){ return next(err); }

//     if(user){
//       user.token = user.generateJWT();
//       return res.json({user: user.toAuthJSON()});
//     } else {
//       return res.status(422).json(info);
//     }
//   })(req, res, next);
// });

router.post('/page', function (req, res, next) {
    //   var user = new User();

    //   user.username = req.body.user.username;
    //   user.email = req.body.user.email;
    //   user.setPassword(req.body.user.password);

    //   user.save().then(function(){
    //     return res.json({user: user.toAuthJSON()});
    //   }).catch(next);
});

module.exports = router;