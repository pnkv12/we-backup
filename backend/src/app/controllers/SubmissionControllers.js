
const Submission = require('../models/Submission')
const Folder = require('../models/Folder')
const googleDrive = require('../../util/drive')

class SubmissionController {

    // [POST] /submission
    async createSubmission(req, res, next) {
        
        try {
            const nameSubmission = req.body.name
            const newSubmission = new Submission(req.body)
            const savedSubmission = await newSubmission.save()
            const submissionId = savedSubmission._id

            // Create a folder for submission
            const folderResult = await googleDrive.createFolder(nameSubmission)
            const folderId = folderResult.id 

            // Generate public path of folder
            const generateResult = await googleDrive.generatePublicUrl(folderId)
            const publicFolder = generateResult.webViewLink

            // Save folder info into db
            const newFolder = new Folder({
                folder_drive_id: folderId,
                folder_path: publicFolder,
                submission_id: submissionId

            })
            const savedFolder = await newFolder.save()
            res.status(200).json({
                submission: savedSubmission,
                folder: savedFolder
            })

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    // [PATCH] /submission/:id
    async updateSubmission(req, res, next){
        
        try {
            const id = req.params.id
            const submission = await Submission.findById(id)

            await submission.updateOne({ $set: req.body})
            const submissionUpdated = await Submission.findById(id)
            res.status(200).json({
                message: "The submission has been updated.",
                submission: submissionUpdated
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /submission/:id
    async deleteSubmission(req, res, next){
        
        try {
            const submissionId = req.params.id
            const submission = await Submission.findById(submissionId)
            await submission.deleteOne()

            // Get folder id 
            const folder = await Folder.find({submission_id: submissionId})
            const folderIdDrive = folder[0].folder_id_drive

            // Delete folder in Google Drive
            await googleDrive.deleteFile(folderIdDrive)

            res.status(200).json({
                message: 'The submission has been deleted.',
                update: 'The folder is deleted in Google Drive.'
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /submissions
    async getAllSubmission(req, res, next){

        try {
            const submission = await Submission.find({})
            res.status(200).json(submission)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /submission/:id
    async getASubmission(req, res, next) {

        try {
            const submission = await Submission.findById(req.params.id)
            res.status(200).json(submission)

        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = new SubmissionController
