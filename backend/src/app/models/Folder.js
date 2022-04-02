const mongoose = require('mongoose')

const FolderSchema = new mongoose.Schema({

    folder_drive_id: {type: String, required: true},
    folder_path: {type: String, required: true},
    submission_id: {type: String, required: true}

}, {timestamps: true}
)

module.exports = mongoose.model('Folder', FolderSchema, 'folders')