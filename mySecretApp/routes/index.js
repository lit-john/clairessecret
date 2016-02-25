var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//Found this server on http://expressjs-book.com/index.html%3Fp=128.html
//var RedisStore = require('connect-redis')(express);

var secretsArray =[];


router.get('/', function(req, res, next){

  if(!req.session.userName){
    res.render('login');
  }
  else{
    res.render('mySecrets');
  }
});

//Creating a variable to hold a new secret and pushing it into the array.
router.get('/addNewSecret', function(req, res, next){
  var newSecret = req.query.secret;
  secretsArray.push(newSecret);
  res.render('mySecrets', {individualSecret: secretsArray});
});


//This is where the requests are sent by the router.
//If the router just receives a get request with /login, use the function below
//This is the file that handles all of the requests.
/* GET home page. */
router.get('/login', function(req, res, next){
  res.render('login');
});

/*router.get('/hello', function(req, res, next) {
  res.render('hello', { title: 'Hello World' });
});*/

//Dealing with a parameter from the form on the login page
//Adding a route/function to handle a post request
router.post('/login', function(req, res, next){
  var setUserName = 'clairelit';
  var setPassword = 'litclonmel';

  if(req.body.userName == setUserName && req.body.password == setPassword){


  //I've created a variable, which stores the parameter userName, sent from the form,
  //to the query and I'm grabbing it out of the query.
  //userName is a parameter sent from the form with the request to the funciton (on the login.jade page)
  var userNameForSession = req.body.userName;

  //This will store the users name in a session.
  //userName is a property of the session
  //Not sure if this will save when app is closed, will test
  req.session.userNameSession = userNameForSession;

//Telling the server which jade page to render to html (in this one its the mySecrets page),
//and send to the browser after the user clicks submit


//user will be brought to their secrets page when they click submit
//Or if their log in details are incorrect, they'll be brought to the wrongLogin page
//I'm going to use an array to store the users secrets
  res.render('mySecrets');
  }
  else{
    res.render('wrongLogin');
  }
});


module.exports = router;
