const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const users = require('./routes/api/users');
const path = require('path');
require('dotenv').config();


const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// app.use(express.json());
app.use(cors());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
// app.get('/', function(req, res, next) {
//     res.send('Hello world');
// })
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', users);
app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
      next(new Error('Something went wrong'));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 5000;
  res.status(err.statusCode).send(err.message);
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
