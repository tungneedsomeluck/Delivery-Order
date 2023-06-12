const exp = require('constants');
const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session')
const morgan = require('morgan');
const { extname } = require('path');
const path = require('path');
const app = express();
const port = 3000;

const route = require('./routes');

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.set('trust proxy', 1) 
app.use(session({
  secret: 'qwrtryt',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// HTTP logger
// app.use(morgan('combined'));

//
// Template engine
app.engine('hbs',handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));


//Routes init
route(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

