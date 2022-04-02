const mongoose = require('mongoose')

const ViewSchema = new mongoose.Schema({

    idea_id: {type: String, required: true},
    user_id: {type: String, required: true}

}, {timestamps: true}
)

module.exports = mongoose.model('View', ViewSchema, 'views')