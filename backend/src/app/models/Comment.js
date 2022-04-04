const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({

    content: {type: String, required: true},
    anonymousMode: {type: Boolean, default: false},
    idea_id: {type: String, required: true},
    user_id : {type: String, required: true},
    comment_id: {type: String, default: ""},
    replierMode: {type: Boolean, default: false}

}, {timestamps: true}
)

module.exports = mongoose.model('Comment', CommentSchema, 'comments')