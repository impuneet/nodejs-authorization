const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const mongoose = require('mongoose');

dotenv.config();

app.use(express.json());

//routes middleware
app.use('/api/user', authRoute);
app.use('/api/post',postsRoute);
//connecting to mongodb

mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true },
() => {
    console.log('connected to DB')
});

//a callback function
app.listen(3001,
    () => console.log('Up and running server '));