const mongoose = require('mongoose')
const {MONGO_URI} = require('./variables')

async function connect(){
    
    const uri = process.env.MONGO_URI || MONGO_URI

    try {
        await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`DB connected successfully`)
    } catch (error) {
        console.log(`Connect failed !!! `)
    }
}

module.exports = {connect}