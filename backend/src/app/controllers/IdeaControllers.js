
const Idea = require('../models/Idea')
const View = require('../models/View')
const React = require('../models/Reaction')
const User = require('../models/User')
const Submission = require('../models/Submission')
const paginatedResults = require('../../util/paginated')
const notificationMail = require('../../util/mail')

class IdeaController {

    // [POST] /idea
    async createIdea(req, res, next){

        try {
            // Create a new idea
            const newIdea = new Idea(req.body)
            const savedIdea = await newIdea.save()

            // Get info user
            const coordinatorRole = '623ec63819af8a0d9cd33b6e'
            const user = await User.find({role_id: coordinatorRole })
            
            // Get a topic
            const submission = await Submission.findById(req.body.submission_id)
            const nameTopic = submission.name

            // Send notification mail to coordinator
            for (const element of user) {
                const fullName = element.fullname
                const email = element.email
                await notificationMail(fullName, email, 'coordinator', nameTopic)
            }

            res.status(200).json(savedIdea)

        } catch (error) {
            console.log(error)
            res.status(300).json(error)
        }
    }

    // [PATCH] /idea/:id
    async updateIdea(req, res, next){

        try {
            
            const id = req.params.id
            const idea = await Idea.findById(id)
    
            await idea.updateOne({
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    content: req.body.content,
                    anonymousMode: req.body.anonymousMode,
                    category_id: req.body.category_id
                }
            })
            const updatedIdea = await Idea.findById(id)
            res.status(200).json({
                message: 'The idea has been updated.',
                idea: updatedIdea
            })

        } catch (error) {
            res.status(500).json(error)
        }

    }

    // [DELETE] /idea/:id
    async deleteIdea(req, res, next){

        try {

            // Delete a idea
            const id = req.params.id
            const idea = await Idea.findById(id)
    
            await idea.deleteOne()

            // Delete all views of idea
            await View.deleteMany({idea_id: id})

            // Delete all reaction of idea
            await React.deleteMany({idea_id: id})

            res.status(200).json({
                message: 'The idea has been deleted.',
                updated: 'All views in this idea have been deleted.'
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /ideas?page={}&limit={}
    async getAllIdea(req, res, next){

        try {
            const p = req.query.page
            const l = req.query.limit
            const idea = await paginatedResults(p, l, Idea)
            
            res.status(200).json(idea)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /idea/:id
    async getAIdea(req, res, next){

        try {
            const id = req.params.id
            const idea = await Idea.findById(id)
            res.status(200).json(idea)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new IdeaController
