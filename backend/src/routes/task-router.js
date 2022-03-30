import express, {response} from 'express';
import {Task} from "../models/task.js";
import chalk from "chalk";
import {ObjectId} from "mongodb";
import {User} from "../models/user.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

export const router = new express.Router();


/* ======================================================= CREATE ======================================================= */


router.post('/tasks', authMiddleware, async (request, response) => {
    const task = new Task({...request.body, owner: request.user._id});

    try {
        await task.save();
        console.log(chalk.green(`CREATE ${task} into MongoDB`));
        response.status(201).send(`CREATE ${task} into MongoDB`);
    } catch (error) {
        console.log(chalk.red(error));
    }

});


/* ======================================================= READ ======================================================= */

router.get('/tasks', async (request, response) => {
    const filter = {}
    const sort = {}
    let skip;
    let limit;

    if (request.query.complete) {
        filter.complete = (request.query.complete === 'true');
    }
    if (request.query.name) {
        filter.name = request.query.name;
    }

    if (request.query.skip) {
        skip = parseInt(request.query.skip);
    }
    if (request.query.limit) {
        limit = parseInt(request.query.limit);
    }
    if (request.query.sortBy) {
        const parts = request.query.sortBy.split('_');
        if(parts[1] === 'desc' ){
            sort[parts[0]] = -1;
        } else {
            sort[parts[0]] = 1;
        }
    }

    try {

        const foundTasks = await Task.find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sort);
        if (foundTasks == null) {
            response.status(404).send(`TASKS NOT FOUND`);
        } else {
            response.status(200).send(`FOUND ${foundTasks}`);
        }

    } catch (error) {
        response.status(500).send(`${error}`);
    }
});

router.get('/tasks/me', authMiddleware, async (request, response) => {
    try {
        const foundTasks = await Task.find({owner: request.user._id});
        if (foundTasks == null) {
            response.status(404).send(`TASKS NOT FOUND`);
        } else {
            response.status(200).send(`FOUND\n${foundTasks}`);
        }

    } catch (error) {
        response.status(500).send(`${error}`);
    }
});


router.get('/tasks/:id', async (request, response) => {
    const _idParam = request.params.id;

    try {
        const foundTask = await Task.findOne({_id: new ObjectId(_idParam)});
        const ownerOfTask = await foundTask.getOwnerOfTask(_idParam);

        if (foundTask == null) {
            response.status(404).send(`TASK NOT FOUND`);
        } else {
            response.status(200).send(`TASK ${foundTask}\nOWNER ${ownerOfTask}`);
        }
    } catch (error) {
        response.status(500).send(`${error}`);
    }
});


/* ======================================================= UPDATE ======================================================= */

router.patch('/tasks/:id', async (request, response) => {
    const fieldsUpdated = Object.keys(request.body);
    const fieldAllowUpdate = ['name', 'complete'];

    const isValidField = fieldsUpdated.every(field => fieldAllowUpdate.includes(field));

    if (!isValidField) {
        response.status(500).send("You must update exactly fields");
        return;
    }

    const _idParam = request.params.id;

    try {

        const updatedTask = await Task.findOne({_id: new ObjectId(_idParam)});

        if (updatedTask == null) {
            response.status(404).send("User not found");
        } else {
            /**
             * Đoạn code này đã bị thay đổi thay vì dùng findByIdAnUpdate( )
             * vì middleware chỉ được fire khi ta dùng save( )
             */
            fieldsUpdated.forEach((field) => {
                updatedTask [field] = request.body[field];
            })
            await updatedTask.save();
            response.send(`UPDATED: ${updatedUser}`);
        }

    } catch (error) {
        response.status(400).send(`${error}`);
    }
});

/* ======================================================= DELETE ======================================================= */

router.delete('/tasks/:id', async (request, response) => {
    const _idParam = request.params.id;

    try {
        const deletedTask = await Task.findOneAndDelete({_id: new ObjectId(_idParam)});

        if (deletedTask == null) {
            response.status(404).send("Task not found");
        } else {
            response.status(200).send(`DELETED: ${deletedTask}`);
        }


    } catch (error) {
        response.status(400).send(`${error}`);
    }
});