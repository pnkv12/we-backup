import express, { response } from 'express';
import { Task } from "../models/task.js";
import chalk from "chalk";
import { ObjectId } from "mongodb";
import { User } from "../models/user.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { Idea } from "../models/idea.js";
import multer from "multer";
import path from "path";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import sendCreateIdea from '../emails/account.js';


export const router = new express.Router();


/* ======================================================= CREATE ======================================================= */
router.post('/ideas', authMiddleware, async (request, response) => {
    const idea = new Idea({ ...request.body, owner: request.user._id });
    try {
        await idea.save();
        console.log(chalk.green(`CREATE ${idea} into MongoDB`));
        response.status(201).send(idea);
        sendCreateIdea(idea.title, idea.content);
    } catch (error) {
        console.log(chalk.red(error));
    }

});


/* ======================================================= UPLOAD DOCUMENTS ======================================================= */
const documentStorage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'documents/')
    },
    filename: function (request, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

const documentUpload = multer({
    storage: documentStorage,
    limits: {
        fileSize: 10000000,
    }
});


const imageUpload = multer({
    limits: {
        fileSize: 10000000,
    },
    fileFilter(request, file, callback) {
        if (!(file.originalname.endsWith('.jpg') || file.originalname.endsWith('.jpeg') || file.originalname.endsWith('.img') || file.originalname.endsWith('.png') || file.originalname.endsWith('.svg'))) {
            return callback(new Error("Format does not supported"));
        }

        callback(undefined, true);
    }
});




aws.config.update({
    secretAccessKey: 'OmN3JrFVQcET6iub0Ri1VFlwSxFSng8qzfOoHfFx',
    accessKeyId: 'AKIAYW6CQBLQ42VD3IVD',
    region: 'ap-southeast-1'
});

// const s3Storage = new aws.S3({
//     accessKeyId: 'AKIAYW6CQBLQ42VD3IVD',
//     secretAccessKey: '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',
//     region: 'ap-southeast-1'
// });

const s3 = new aws.S3();

const s3Upload = multer({

    storage: multerS3({
        s3: s3,
        bucket: "web-enterprises",
        metadata: function (request, file, callback) {
            callback(null, { fieldName: file.originalname.toString() });
        },
        key: function (request, file, callback) {
            callback(null, file.originalname);
        },
    }),
});




router.post('/upload', documentUpload.single("document"), (request, response) => {


    console.log(request.file);

    response.status(200).send(request.file.path);
});


router.post('/uploadS3', s3Upload.single("document"), async (request, response, error) => {
    const _ideaId = request.query.ideaId;
    const fileName = request.query.fileName;

    const foundIdea = await Idea.findById(_ideaId);

    const url = s3.getSignedUrl('getObject', {
        Bucket: "web-enterprises",
        Key: fileName,
        Expires: 100000
    })


    foundIdea.documents.push({ url: url.toString() })
    await foundIdea.save();
    console.log(`Upload document for Idea: ${foundIdea}`);

    response.status(200).send(foundIdea);
});





router.post('/users/me/avatar', imageUpload.single("upload"), (request, response) => {
    console.log(request.file);
    console.log(request.file.buffer);
    response.status(200).send(request.file);
}, (error, request, response, next) => {

    response.status(400).send({ error: error.message });
});




/* ======================================================= READ ======================================================= */


router.get('/ideas', async (request, response) => {
    const filter = {}
    const sort = {}
    let skip;
    let limit;

    if (request.query.isAnonymous) {
        filter.isAnonymous = (request.query.isAnonymous === 'true');
    }
    if (request.query.search) {
        filter.title = RegExp(".*"+request.query.search+".*");
    }
    if (request.query.limit) {
        limit = parseInt(request.query.limit);
    }
    if (request.query.skip) {
        skip = parseInt(request.query.skip);
    }
    if (request.query.sortBy) {
        const parts = request.query.sortBy.split('_');
        if (parts[1] === 'desc') {
            sort[parts[0]] = -1;
        } else {
            sort[parts[0]] = 1;
        }
    }

    try {

        const foundIdeas = await Idea.find(filter)
            .limit(limit)
            .skip(skip)
            .sort(sort);
        if (foundIdeas == null) {
            response.status(404).send(`IDEAS NOT FOUND`);
        } else {
            console.log(foundIdeas);
            response.status(200).send(foundIdeas);
        }

    } catch (error) {
        response.status(500).send(`${error}`);
    }
});

router.get('/ideas', (req, res, next) => {
    const searchTitle = req.query.title;
    Idea.find({search:{$regex: searchTitle, $options: '$i'}})
    .then((ideads) => {
        res.json(ideads);
    })
    .catch(next);
});

router.get('/ideas/:id', async (request, response) => {
    const _idParam = request.params.id;

    try {
        const foundIdea = await Idea.findOne({ _id: new ObjectId(_idParam) });

        if (foundIdea == null) {
            response.status(404).send(`TASK NOT FOUND`);
        } else {
            response.status(200).send(foundIdea);
        }
    } catch (error) {
        response.status(500).send(`${error}`);
    }
});

/* ======================================================= UPDATE ======================================================= */

router.patch('/ideas/:id', async (request, response) => {
    const fieldsUpdated = Object.keys(request.body);
    const fieldAllowUpdate = ['title','content'];

    const isValidField = fieldsUpdated.every(field => fieldAllowUpdate.includes(field));

    if (!isValidField) {
        response.status(500).send("You must update exactly fields");
        return;
    }

    const _idParam = request.params.id;

    try {

        const updatedIdea = await Idea.findOne({_id: new ObjectId(_idParam)});

        if (updatedIdea == null) {
            response.status(404).send("User not found");
        } else {
            /**
             * Đoạn code này đã bị thay đổi thay vì dùng findByIdAnUpdate( )
             * vì middleware chỉ được fire khi ta dùng save( )
             */
            fieldsUpdated.forEach((field) => {
                updatedIdea[field] = request.body[field];
            })
            await updatedIdea.save();
            response.send(`UPDATED: ${updatedIdea}`);
        }

    } catch (error) {
        response.status(400).send(`${error}`);
    }
});



router.patch('/ideas/:id', async (request, response) => {

    const _idParam = request.params.id;

    try {

        const updatedIdea = await Idea.findOne({ _id: new ObjectId(_idParam) });

        if (updatedIdea == null) {
            response.status(404).send("Idea not found");
        } else {
            if (request.query.views) {
                await Idea.findByIdAndUpdate({ _id: new ObjectId(_idParam) }, { $inc: { views: 1 } },);
                const newIdea = await Idea.findOne({ _id: new ObjectId(_idParam) });
                response.status(200).send(newIdea);
            } else {
                response.status(200).send('NOTHING TO UPDATE');
            }
        }

    } catch (error) {
        response.status(400).send(`${error}`);
    }
});

/* ======================================================= DELETE ======================================================= */
router.delete('/ideas/:id', async (request, response) =>{
    const _idParam = request.params.id;

    try {
        const deletedIdea = await Idea.findOne({ _id: new ObjectId(_idParam) });

        if (deletedIdea == null) {
            response.status(404).send("Idea not found");
        } else {
            await deletedIdea.remove();
            response.status(200).send(`DELETED: ${deletedIdea}`);
        }


    } catch (error) {
        response.status(400).send(`${error}`);
    }
});