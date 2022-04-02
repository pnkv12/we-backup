const express = require('express')
const morgan  = require('morgan')
const cors = require('cors')
const compression = require('compression')
const session = require('express-session')

const app = express()
const port = process.env.PORT || 3000

//
// Session
app.use(
    session({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
      cookie: {
        expires: new Date(Date.now() + 60000 * 60) //? Session expire in 1 hour
      }
    })
  )

// CORS Policy
app.use(cors())

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Gzip
app.use(compression(
    {
        level: 6,
        threshold: 100 * 1000,
        filter: (req, res) => {
            if(req.headers['x-no-compression']){
                return false;
            }
            return compression.filter(req, res)
        } 
    }
))

// Logger
app.use(morgan('dev'))

// Route Init
const route = require('./routes')
route(app)

// Connect to DB
const db = require('./config/mongodb');
db.connect();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})