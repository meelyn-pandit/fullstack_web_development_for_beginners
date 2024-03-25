import app from './server.js'
import mongodb from 'mongodb'
import 'dotenv/config' // need to import dotenv to use .env file and protected passwords!
// import ReviewsDAO from './dao/reviewsDAO.js'

const MongoClient = mongodb.MongoClient
// const mongo_username = process.env['MONGO_USERNAME']
// const mongo_password = process.env['MONGO_PASSWORD']

const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD

console.log('mongodb credentials', mongo_username, mongo_password)

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@moviecluster.zwxdejx.mongodb.net/?retryWrites=true&w=majority`

const port = 8000 // port for server

MongoClient.connect( // from mongodb library
    uri,
    {
        maxPoolSize: 50, // amount of people that connect to it at one time
        wtimeoutMS: 2500, // 25 s, how long the connection can try to connect before it times out
        useNewUrlParser: true, // always need to set to true because of how mongo gets parsed
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        }) //app.listen starts the server
    })