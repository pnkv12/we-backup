const Folder = require('../models/Folder')

class FolderController {

    // [POST] /folder
    async createFolder(req, res, next) {
        try {
            // Create a new idea
            const newFolder = new Folder(req.body)
            const savedFolder = await newFolder.save()
            res.status(200).json(savedFolder)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /folder/:id
    async deleteFolder(req, res, next) {
        try {
            const folderId = req.params.id
            const folder = await Folder.findById(folderId)
            await folder.deleteOne()
            res.status(200).json({
                message: 'The folder is deleted'
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /folder/:id
    async showAFolder(req, res, next) {
        try {
            const folderId = req.params.id
            const folder = await Fodler.findById(folderId)
            res.status(200).json(folder)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /folders
    async showAllFolder(req, res, next) {
        try {
            const folder = await Folder.find({})
            res.status(200).json(folder)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new FolderController