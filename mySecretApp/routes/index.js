var express = require('express');
var router = express.Router();

//This is where the requests are sent by the router.  This is the file that handles all of the requests.
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next) {
  res.render('hello', { title: 'Hello World' });
});
module.exports = router;
