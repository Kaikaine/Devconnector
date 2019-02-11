const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const cors = require('cors')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')


const app = express()
// DB Config

// Body parser middleware
app.options('*', cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const db = require('./config/keys').mongoURI

// connect to mongoose
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

// app.get('/', (req,res) => (
//     res.send('Hello')
// ))

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport.js')

// USE routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    // app.use(express.static('client/build'))
    // app.get('/', (req,res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    // })
    app.get("/", autoRedirect, function(req, res){
        res.sendFile(path.resolve(__dirname, "client", "index.html"));
     });
   //Public files <this needs to stay right below app.get("/")!!!!
     app.use(express.static(__dirname + "/client"))
}


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("App is running on port " + port);
});