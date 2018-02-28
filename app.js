const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//load config
const db = require('./config/database');


//connect to mongoose
mongoose.connect(db.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//init app    
const app = express()

//load routes
const users = require('./routes/users');

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//core middleware
app.use(cors());

//parse middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//use routes
app.use('/users', users);

app.get('/', (req, res) => { 
    res.send('welcome') 
})

const port = 3000;
var server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})