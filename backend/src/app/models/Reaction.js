const mongoose = require('mongoose')

const ReactionSchema = new mongoose.Schema({

    idea_id: {type: String, required: true},
    user_id: {type: String,  required: true},
    reaction_id: {type: String, required: true}

}, {timestamps: true}
)

module.exports = mongoose.model('Reaction', ReactionSchema, 'reactions')