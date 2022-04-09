
const Idea = require('../models/Idea')
const Notify = require('../models/Notify')
const React = require('../models/Reaction')


class NotifyController {
    // [POST] /notify
    async createNotify(req, res, next){
        try {
            const newNotify = new Notify(req.body)
            const savedNotify = await newNotify.save()

            res.status(200).json(savedNotify)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }


    // [GET] /notify/:forUser
    async getNotifyOfUser(req, res, next){
        try {

            const userId = req.params.forUser

            const foundNotify = await Notify.find({forUser: userId})

            console.log(foundNotify)

            res.status(200).json(foundNotify)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    async getAllNotify(req, res, next){
        try {

            const foundNotify = await Notify.find({})

            console.log(foundNotify)

            res.status(200).json(foundNotify)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

}

module.exports = new NotifyController
