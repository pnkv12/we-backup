const File = require('../models/File')
const Folder = require('../models/Folder')
const Idea = require('../models/Idea')
const googleDrive = require('../../util/drive')
const stream = require('stream')

class FileController {

    // [POST] /file/:id/idea
    async createFile(req, res, next){

        try {
            const fileName = req.file.originalname
            const typeFile = req.file.mimetype
            const fileObj = req.file
            const ideaId = req.params.id

            // Buffer file
            const bufferStream = await new stream.PassThrough()
            const fileBuffer = await bufferStream.end(fileObj.buffer)

            //Get submission info
            const user = await Idea.findById(ideaId)
            const submissionId = user.submission_id

            // Get info of folder id Google Drive
            const folder = await Folder.find({submission_id: submissionId})
            const folderIdDrive = folder[0].folder_id_drive
            const folderId = folder[0]._id

            // Upload file to Google Drive
            const uploadResult = await googleDrive.uploadFile(fileBuffer, typeFile, folderIdDrive, fileName)
            const fileId = uploadResult.id

            // Generate public URL for file
            const generateResult = await googleDrive.generatePublicUrl(fileId)
            const publicPath = generateResult.webViewLink

            // Save all info data into db
            const newFile = new File({
                file_id_drive: fileId,
                file_path: publicPath,
                idea_id: ideaId,
                folder_id: folderId
            }) 
            const savedFile = await newFile.save()
            res.status(200).json(savedFile)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /file/:id
    async deleteFile(req, res, next){

        try {
            const file = await File.findById(req.params.id)
            const fileIdDrive = file.file_id_drive 

            // Delete file in Google Drive
            await googleDrive.deleteFile(fileIdDrive)

            // Delete file in file collection
            await file.deleteOne()
            res.status(200).json({
                message: 'The file has been deleted.'
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /file/:id/idea
    async getAllFile(req, res, next){

        try {
            const ideaId = req.params.id
            const file = await File.find({idea_id: ideaId})
            res.status(200).json(file)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new FileController