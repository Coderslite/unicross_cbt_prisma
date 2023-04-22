const express = require('express');
const cookieParser = require('cookie-parser')
const lecturerRoutes = require('./routes/lecturerRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');
const registeredCoursesRoutes = require('./routes/registeredCoursesRoute');
const questionRoutes = require('./routes/questionRoutes');
require('dotenv').config();


const app = express();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// cookie middleware
app.use(cookieParser());

 app.get('/',(req,res)=>{
    res.send('How are you')
 })
 app.use('/api',lecturerRoutes);
 app.use('/api',courseRoutes);
 app.use('/api',studentRoutes);
 app.use('/api',registeredCoursesRoutes);
 app.use('/api',questionRoutes);

 app.listen(3000,()=>{
    console.log("listening to port 3000");
 })