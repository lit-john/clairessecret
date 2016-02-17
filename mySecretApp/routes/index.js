var express = require('express');
var router = express.Router();

//Found this server on http://expressjs-book.com/index.html%3Fp=128.html
var RedisStore = require('connect-redis')(express);

var username = "clairelit";
var password = "litclonmel";


//This is where the requests are sent by the router.
//If the router just receives a get request with /, use the function below
//This is the file that handles all of the requests.
/* GET home page. */
router.get('/welcome', function(req, res, next) {
  res.render('welcome');
});

/*router.get('/hello', function(req, res, next) {
  res.render('hello', { title: 'Hello World' });
});*/

//Dealing with a parameter from the form on the welome page
//Adding a route/function to handle a get request, directed to /addName.
router.get('/addName', function(req, res, next){
  //I've created a variable, which stores the parameter yourName, sent from the form,
  //to the query and I'm grabbing it out of the query.
  //yourName is a parameter sent from the form with the request to the funciton (on the welcome.jade page)
  var nameSetOnSession = req.query.yourName;

  //This will store the users name in a session.
  //userName is a property of the session
  //Not sure if this will save when app is closed, will test
  req.session.userName = nameSetOnSession;

//Telling the server which jade page to render to html (in this one its the hi page),
//and send to the browser after the user clicks submit


//thePersonsName, is the value that's being filled in the jade hi page
//nameSetOnSession is what it's being filled with
  res.render ('hi', {thePersonsName: nameSetOnSession});
});


//Another route to handle a get request, but the difference here is:
//This tests to see if the user has already stored their name in this session
//So basically, the name that shows when this page has been rendered, has been pulled down from the browsers session
router.get('/hiAgain', function(req, res, next){
  //Pulling down the name from the session again, that was stored earlier by the user
  var alreadyStoredSessionName = req.session.userName;
  //Go render the hiAgain jade page
  //There's a var in that jade page (hiAgain) called name, and it's being filled
  //dynamically with the name from the session.
	res.render('hiAgain', {name: alreadyStoredSessionName});
});



module.exports = router;
