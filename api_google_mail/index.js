const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// authorize all cors origins with : '*' paramaters
app.use(cors({"origin": "*"}))

// get all routes
require('./routes/auth.route')(app)
require('./routes/mail.route')(app)

const port = process.env.PORT || 8081
app.listen(port, () => { console.log("application running on port 8081") })

