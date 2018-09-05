let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let Moment = require('moment');
let flash = require('express-flash');
let session = require('express-session');

let app = express();

const Greeter = require('./greeting');
const greetings = Greeter();


//setting up handlebars
let myhbp = exphbs.create({
  defaultLayout: 'main'
});

app.engine('handlebars', myhbp.engine);
app.set('view engine', 'handlebars');

app.use(session({
	secret: 'This is My long String that is used for session in http',
	resave: false,
	saveUninitialized: true
}));

//initialise the flash middleware
app.use(flash());

//parse application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended : false}));

//parse application-json
app.use(bodyParser.json());

//adding public folder
app.use(express.static('public/'));

app.get("/", function(req, res){
  res.render('home');
});

app.get('/greeted', function(req, res){
  res.render('greeted',  )
});

let PORT = process.env.PORT || 3013;

app.listen(PORT, function(){
  console.log("App started on Port, ", PORT);
});
