const React = require('../models/Reaction')
const Idea = require('../models/Idea')
class ReactionController {

    // [POST] /reaction
    async createReact(req, res, next){

        try {
            const ideaId = req.body.idea_id

            // Create new reaction
            const newReact = new React(req.body)
            const savedReact = newReact.save()

            // Count total reactions
            const reaction = await React.find({idea_id: ideaId})
            const countReact = reaction.length

            // Update total reaction in idea collection 
            const idea = await Idea.findById(ideaId)
            await idea.updateOne({ $set: {total_reaction: countReact}})

            res.status(200).json({
                message: 'New reaction has been created',
                reaction: savedReact,
                updated: 'Total reaction have been updated'
            })
            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PATCH] /react/:id
    async updateReact(req, res, next){

        try {
            const reactId = req.params.id 
            const updatedReact = await React.findByIdAndUpdate(reactId, req.body)
            res.status(200).json(updatedReact)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /react?userId={}&ideaId={}
    async getAllReact(req, res, next){

        try {
            const ideaId = req.query.ideaId
            const userId = req.query.userId
            const react = await React.find({
                idea_id: ideaId,
                user_id: userId
            })
            res.status(200).json(react)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    
}

module.exports = new ReactionController