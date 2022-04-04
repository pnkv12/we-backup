const express = require('express')
const morgan  = require('morgan')
const cors = require('cors')
const compression = require('compression')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 8000

// Cookie
app.use(cookieParser())


// Session
app.use(
    session({
      key: 'userId',
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: new Date(Date.now() + 60000 * 60), //? Session expire in 1 hour
      }
    })
  )

// CORS Policy
app.use(cors({  
  origin: 'http://localhost:3000',
  credentials: true
}))

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