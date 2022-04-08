const mongoose = require('mongoose')

const IdeaSchema = new mongoose.Schema({

        title: {type: String, required: true},
        description: {type: String, required: true, default: ""},
        content: {type: String, required: true},
        anonymousMode: {type: Boolean, default: false},
        user_id: {type: String, required: true},
        submission_id: {type: String, default: "6249e1bdabe8dbf2e9786874"},
        documentURL: {type: String, default: ""},
        categories: [
            {
                category: {
                    type: String
                }
            }
        ],
        total_view: {type: String, default: ""},
        total_reaction: {type: String, default: ""},
        thumbsUp: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        thumbsDown: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],

    }, {timestamps: true}
)

module.exports = mongoose.model('Idea', IdeaSchema, 'ideas')
