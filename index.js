const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const connectDB = require('./src/config/db');
const studentRouter = require('./src/routes/studentRec.routes');

dotenv.config();
const app = express();

app.use(express.json())
app.use(morgan('dev'))
const PORT = process.env.PORT || 4500;

app.get('/', (req, res)=> {
    res.send('Welcome To My Home Page')
})


app.use('/api/students', studentRouter);


app.listen(PORT, ()=> {
    connectDB()
    console.log(`Server is running on http://localhost:${PORT}`)
})