const mongoose = require('mongoose')

const NotifySchema = new mongoose.Schema({
        forUser: {type: String, required: true},
        message: {type: String, required: true},
        detailPage: {type: String, default: "/"},
        image: {type: String, default: ""},
        receivedTime: {type: Date, default: Date.now()}

    }, {timestamps: true}
)

module.exports = mongoose.model('Notify', NotifySchema, 'notify')
