const Idea = require('../models/Idea')
const View = require('../models/View')
const React = require('../models/Reaction')
const User = require('../models/User')
const Submission = require('../models/Submission')
const paginatedResults = require('../../util/paginated')
const notificationMail = require('../../util/mail')
const Notify = require("../models/Notify");

class IdeaController {

    // [POST] /idea
    async createIdea(req, res, next) {

        try {
            // Create a new idea
            console.log(req.body)
            const newIdea = new Idea(req.body)
            const savedIdea = await newIdea.save()

            // Get info user
            const user = await User.findOne({_id: savedIdea.user_id})
            const departmentId = user.department_id;
            const coordinators = await User.find({department_id: departmentId, role_id: '62482516ad01d9a46b246089'})


            // Get a topic
            const submission = await Submission.findById(req.body.submission_id)
            const nameTopic = submission.name


            //Send notification mail to coordinator
            for (const user of coordinators) {
                const fullName = user.fullname
                const email = user.email
                await notificationMail(fullName, email, 'coordinator', nameTopic)
            }

            //Send notification to coordinator
            for (const user of coordinators) {
                const newNotify = new Notify({forUser: user._id, message: `New idea added`,detailPage: `/ideas/${savedIdea._id}`  })
                await newNotify.save()
            }


            res.status(200).json(savedIdea)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    // [PATCH] /idea/:id
    async updateIdea(req, res, next) {

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
    async deleteIdea(req, res, next) {

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

    // [GET] /ideas?skip={}&limit={}
    async getAllIdea(req, res, next) {
        try {

            let skip;
            let limit;
            if (req.query.limit) {
                limit = parseInt(req.query.limit);
            }
            if (req.query.skip) {
                skip = parseInt(req.query.skip);
            }


            const foundIdeas = await Idea.find({})
                .limit(limit)
                .skip(skip)

            console.log(foundIdeas)

            res.status(200).json(foundIdeas)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    // [GET] /idea/:id
    async getAIdea(req, res, next) {

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
