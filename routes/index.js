var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Express' });
});

router.get('/insta', function(req, res, next) {
    res.send(req.query['hub.challenge'])
});

router.post('/insta', function(req, res, next) {
    console.log( req.body )

    res.json( req.body[0].data );
});

module.exports = router;
