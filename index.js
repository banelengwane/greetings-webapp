let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let Moment = require('moment');
let flash = require('express-flash');
let session = require('express-session');
let routes = require('./routes/greetingsRoute')
let pg = require('pg');
let Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost/greetings';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });

let app = express();

  app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

const Greeter = require('./greeting');
const greetings = Greeter(pool);
const greetingsRoute = routes(greetings)

//setting up handlebars
let myhbp = exphbs.create({
  defaultLayout: 'main',
  helpers: {
		'time': function () {
			return Moment(this.timestamp).fromNow();
    }
  }
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

app.get("/", greetingsRoute.counted);

app.get('/greeted', greetingsRoute.greeted);

app.post('/greetings', greetingsRoute.toGreet)

let PORT = process.env.PORT || 3013;

app.listen(PORT, function(){
  console.log("App started on Port, ", PORT);
});
