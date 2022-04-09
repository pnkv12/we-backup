const Idea = require('../models/Idea')
const Submission = require('../models/Submission')
const Category = require('../models/Category')
const User = require('../models/User')
const CsvParser = require("json2csv").Parser;
const moment = require('moment')
const fs = require("fs");
const path = require("path")
const {LocalFileData} = require("get-file-object-from-local-path");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const request = require('request');
const axios = require("axios");
const JSZip = require("jszip");
const {google} = require('googleapis')
const {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN_DRIVE} = require('../../config/variables')

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN_DRIVE });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});


class DownloadController {

    // [GET] /csv/download/:submissionId
    async csvDownload(req, res, next) {

        const submissionId = req.params.submissionId;

        try {
            const ideas = await Idea.find({submission_id: submissionId})
            console.log(ideas)
            let csv = [];
            for (const idea of ideas) {

                // Get id
                const userId = idea.user_id
                const submissionId = idea.submission_id


                // Find info 
                const userInfo = await User.findById(userId)
                const email = userInfo.email
                const fullName = userInfo.fullname
                const departmentName = userInfo.department_name
                const roleName = userInfo.role_name
                const submissionInfo = await Submission.findById(submissionId)
                const submitName = submissionInfo.name
                const finalClosureDate = submissionInfo.final_closure_date

                //const categoryName = categoryInfo.name

                const dataExported = {
                    id: idea._id,
                    title: idea.title,
                    description: idea.description,
                    content: idea.content,
                    anonymousMode: idea.anonymousMode,
                    email: email,
                    fullName: fullName,
                    departmentName: departmentName,
                    roleName: roleName,
                    submission: submitName,
                    thumbsUp: idea.thumbsUp,
                    thumbsDown: idea.thumbsDown,
                    documentURL: idea.documentURL,
                    totalViews: idea.total_view,
                    totalReaction: idea.total_reaction,
                    finalClosureDate: finalClosureDate
                };

                csv.push(dataExported)
            }

            const csvFields = [
                {
                    label: 'ID',
                    value: 'id'
                },
                {
                    label: 'Title',
                    value: 'title'
                },
                {
                    label: 'Description',
                    value: 'description'
                },
                {
                    label: 'Content',
                    value: 'content'
                },
                {
                    label: 'Anonymous Mode',
                    value: 'anonymousMode'
                },
                {
                    label: 'Email',
                    value: 'email'
                },
                {
                    label: 'Full Name',
                    value: 'fullName'
                },
                {
                    label: 'Department Name',
                    value: 'departmentName'
                },
                {
                    label: 'Role Name',
                    value: 'roleName'
                },
                {
                    label: 'Submission',
                    value: 'submission'
                },
                {
                    label: 'Like',
                    value: 'thumbsUp'
                },
                {
                    label: 'Dislike',
                    value: 'thumbsDown'
                },
                {
                    label: 'Document URL',
                    value: 'documentURL'
                },
                {
                    label: 'Topic',
                    value: 'topic'
                },
                {
                    label: 'Total Views',
                    value: 'totalViews'
                },
                {
                    label: 'Total Reaction',
                    value: 'totalReaction'
                },
                {
                    label: 'Final Closure Date',
                    value: 'finalClosureDate'
                }
            ]
            const csvParser = new CsvParser({fields: csvFields, quote: ''})
            const csvData = csvParser.parse(csv)

            console.log(csvData)
            const targetPath = path.resolve(__dirname, '../../exported_file')

            // res.setHeader("Content-Type", "text/csv")
            // res.setHeader("Content-Disposition", `attachment; filename=${moment(Date.now()).format('YYYYMMDDHHmmss')}.csv`)

            await fs.writeFileSync(`${targetPath}/data.csv`, csvData);

            const file = `${targetPath}/data.csv`;

            res.download(file);


        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    // [GET] /zip/download/:ideaId
    async zipDownload(req, res, next) {

        const ideaId = req.params.ideaId;

        try {
            const idea = await Idea.findOne({_id: ideaId})
            const zip = new JSZip();

            const targetPath = path.resolve(__dirname, '../../exported_zip')


            if(idea.file_id !== undefined && idea.file_name !== undefined) {

                const response = await drive.files.get({fileId: `${idea.file_id}`, alt:'media'},{responseType: 'stream'});

                await zip.file(`${idea.file_name}`, response .data);

                await zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
                    .pipe(fs.createWriteStream(`${targetPath}/${idea._id}.zip`))
                    .on('finish', function () {
                        res.download(`${targetPath}/${idea._id}.zip`);
                    });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

}

module.exports = new DownloadController
