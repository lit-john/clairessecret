var express = require('express');
var router = express.Router();

//Found this server on http://expressjs-book.com/index.html%3Fp=128.html
//var RedisStore = require('connect-redis')(express);

var setUsername = "clairelit";
var setPassword = "litclonmel";


//This is where the requests are sent by the router.
//If the router just receives a get request with /, use the function below
//This is the file that handles all of the requests.
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/*router.get('/hello', function(req, res, next) {
  res.render('hello', { title: 'Hello World' });
});*/

//Dealing with a parameter from the form on the welome page
//Adding a route/function to handle a get request, directed to /addName.
router.post('/login', function(req, res, next){
  if(req.body.userName == setUserName && req.body.password == setPassword){


  //I've created a variable, which stores the parameter userName, sent from the form,
  //to the query and I'm grabbing it out of the query.
  //userName is a parameter sent from the form with the request to the funciton (on the welcome.jade page)
  var userName = req.body.userName;

  //This will store the users name in a session.
  //userName is a property of the session
  //Not sure if this will save when app is closed, will test
  req.session.userName = userName;
  
//Telling the server which jade page to render to html (in this one its the hi page),
//and send to the browser after the user clicks submit


//thePersonsName, is the value that's being filled in the jade hi page
//nameSetOnSession is what it's being filled with
  res.render ('mySecrets', {secrets: secretsArray});
  }
  else {
    res.render("wrongLogin");
  }
});


module.exports = router;
