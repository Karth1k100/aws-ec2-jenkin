// Load the AWS SDK
var AWS = require('aws-sdk');

var express = require('express');
var bodyParser = require('body-parser');
var path = require ('path');
var movieRouter = require('./routers/movie-router.js');
//var userRouter = require('./routers/user-router.js');
//import  movieRouter  from './routers/movie-router.js';
//import  userRouter  from './routers/user-router.js';

// Set region for AWS SDKs
AWS.config.region = process.env.REGION

var app = express()



app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.use(
  express.static(path.join(__dirname, 'static'))
);
//app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// log the request being made
app.use((req, res, next) => {
  console.log(`request made with path: ${req.path} \nand type: ${req.method}`);
  next();
});

app.get('/', function (req, res) {
  res.render('index', {
    title: 'This is a test of webhook 100 !!'
    })
    res.status(200).end();
})
app.get('/test-endpoint', (req, res) => {
  res.json({content: 'hello Webhook'});
});

app.use('/movies', movieRouter);
//app.use('/users', userRouter);
var port = process.env.PORT || 3001

var server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/')
})
