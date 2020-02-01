const express = require('express');
const app = express();
const authRoute = require('./routes/auth');

//routes middleware
app.use('/api/user',authRoute);


//a callback function
app.listen(3001,
    () => console.log('Up and running server '));