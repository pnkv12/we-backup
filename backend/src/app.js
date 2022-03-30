import { MongoClient, ObjectId } from 'mongodb';
import { User } from './models/user.js';
import express, { request, response } from 'express';
import chalk from "chalk";
import { Task } from "./models/task.js";
import mongoose from "mongoose";
import { router as userRouter } from "./routes/user-router.js";
import { router as taskRouter } from "./routes/task-router.js";
import { router as ideaRouter } from "./routes/idea-router.js";
import { router as categoryRouter } from "./routes/category-router.js";
import { router as commentRouter } from "./routes/comment-router.js";
import { connection } from "./database/config.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import multerS3 from "multer-s3";
import cors from "cors";
import path from 'path';
import aws from "aws-sdk";

const app = express();
const port = 8000;


app.use((request, response, next) => {
    console.log(chalk.bgWhiteBright.green(` --------------------------------- REQUEST --------------------------------- `));
    console.log(`PATH: ${request.path}`);
    console.log(`METHOD: ${request.method}`);
    console.log(`PARAMS: ${request.query}`);
    console.log(chalk.bgWhiteBright.green(` --------------------------------------------------------------------------- `));
    next();
});

app.use(cors());

app.use(
    express.urlencoded({
        extended: true,
    }));
    
app.use(express.json());

await connection;
app.use(userRouter);
app.use(taskRouter);
app.use(ideaRouter);
app.use(categoryRouter);
app.use(commentRouter);





app.listen(port, () => {
    console.log(chalk.green(`Listening on port ${port}`));
})