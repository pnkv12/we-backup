const Icon = require('../models/Icon')

class IconController {

    // [POST] /icon
    async createNewIcon(req, res, next){

        try {
            const newIcon = new Icon(req.body)
            const savedIcon = await newIcon.save()
            res.status(200).json(savedIcon)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PUT] /icon/:id
    async updateIcon(req, res, next){

        try {
            const iconId = req.params.id 
            const icon = await Icon.findById(iconId)
            await icon.updateOne({$set: req.body})

            const updatedIcon = await Icon.findById(iconId)
            res.status(200).json({
                message: 'The icon has been updated.',
                icon: updatedIcon
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /icon/:id
    async deleteIcon(req, res, next){

        try {
            const icon = await Icon.findById(req.params.id)
            await icon.deleteOne()
            res.status(200).json({
                message: 'The icon has been deleted.'
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /icons
    async getAllIcon(req, res, next){

        try {
            const icon = await Icon.find({})
            res.status(200).json(icon)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /icon/:id
    async getAIcon(req, res, next){

        try {
            const icon = await Icon.findById(req.params.id)
            res.status(200).json(icon)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new IconController