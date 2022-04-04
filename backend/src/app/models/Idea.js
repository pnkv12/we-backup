const mongoose = require('mongoose')

const IdeaSchema = new mongoose.Schema({

    title: {type: String, required: true},
    description: {type: String, required: true, default: ""},
    content: {type: String, required: true},
    anonymousMode: {type: Boolean, default: false},
    user_id: {type: String, required: true},
    submission_id: {type: String, required: true},
    category_id: {type: String, required: true},
    total_view: {type: String, default: ""},
    total_reaction: {type: String, default: ""}

}, {timestamps: true}
)

module.exports = mongoose.model('Idea', IdeaSchema, 'ideas')