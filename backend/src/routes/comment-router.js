import express, { response } from 'express';
import { Category } from "../models/category.js";
import { Idea } from "../models/idea.js";
import { Comment } from "../models/comment.js";
import chalk from "chalk";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { ObjectId } from "mongodb";


export const router = new express.Router();

/* =============================================================== CREATE =============================================================== */

router.post('/comments', authMiddleware, async (request, response, next) => {

    const _ideaId = request.query.ideaId;
    const comment = new Comment({ ...request.body, ideaId: _ideaId, owner: request.user._id });
    // TODO: maybe add parentID here?

    try {
        await comment.save();
        console.log(chalk.green(`CREATE ${comment}`));
        response.status(201).send(comment);
    } catch (error) {
        console.log(chalk.red(error));
    }


});

/* =============================================================== READ =============================================================== */
router.get('/comments', async (request, response) => {
    const _ideaId = request.query.ideaId;

    try {
        const foundComments = await Comment.find({ ideaId: new ObjectId(_ideaId) });

        console.log(foundComments);
        if (foundComments.length === 0) {
            return;
        } else {
            response.status(200).send(foundComments);
        }
    } catch (error) {
        response.status(500).send(`${error}`);
    }
});



/* =============================================================== UPDATE =============================================================== */


/* =============================================================== DELETE =============================================================== */

