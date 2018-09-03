let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');

let app = express();

const Greeter = require('./greeting');
const greetings = Greeter();

//setting up handlebars
let myhbp = exphbs.create({
  defaultLayout: 'main'
});
app.engine('handlebars', myhbp.engine);
app.set('view engine', 'handlebars');

//parse application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended : false}));

//parse application-json
app.use(bodyParser.json());

//adding public folder
app.use(express.static('public/'));

app.get("/", function(req, res){
  res.render('home');
})

let PORT = process.env.PORT || 3013;

app.listen(PORT, function(){
  console.log("App started on Port, ", PORT);
});
