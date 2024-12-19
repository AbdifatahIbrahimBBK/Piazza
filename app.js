// 1. Import the libraries

const express = require('express')
const { restart } = require('nodemon')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser') //
require('dotenv/config') //





const users = require('./routes/users')
const post = require('./routes/post')


// 2. Middleware - BASE URLs
app.use(bodyParser.json()) //
app.use('/users',users)
app.use('/post',post)


// 3. Create a route
app.get('/', (req,res)=> {
    res.send('You are in your home page!')
})

mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log('Your mongoDB connector is on...') //
}).catch(error => console.log(error))

//4. Start the server
app.listen(3000, ()=>{
    console.log('Server is up and running...')
})