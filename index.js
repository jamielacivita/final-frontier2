let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let galaxyRoutes = require('./server-assets/routes/galaxies-routes.js')

// add require route files here.

//Establish Connection to Server
let server = express()
const PORT = 8080
server.listen(PORT, function(){
    console.log("The server is running comfortabally.")})

//Establish Connection to Database
//Rewrite prior to produciton!!!
//const connectionString = 'mongodb://${userName}:${password}@ds064188.mlab.com:64188/universe'
const connectionString = `mongodb://JCL:sunfish_55@ds064188.mlab.com:64188/universe`

let connection = mongoose.connection;

mongoose.connect(connectionString, {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
});

connection.on('error', (err) => {
  console.log('THERE WAS A CONNECTION PROBLEM', err)
})

connection.once('open', () => {console.log('We are now connected to the database')})

server.use(galaxyRoutes)



