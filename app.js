const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');


// Port
const port = process.env.PORT || 3000;


// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));


// Static content
app.use(express.static('./public'));


// Set up Template engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs');


// ROUTES
const reviewsController = require('./controllers/reviews.js');
app.use('/', reviewsController);


// 404 page
// app.get('*', (req, res) => {
//   res.render('error/index.hbs');
// })


//******************   NEW WAY    ********************//
// Mongoose Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rotten-potatoes';
mongoose.connect( mongoUri, { useNewUrlParser: true });
mongoose.set('debug', true);


// Server
app.listen(port, () => {
  console.log(`App listening on port: ${port}`)
});