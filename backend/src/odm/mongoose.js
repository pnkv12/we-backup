import mongoose from 'mongoose';
import validator, * as otherValidator from 'validator';
import chalk from 'chalk';
import {User} from "../models/user.js";
import {Task} from "../models/task.js";
import { MongoClient, ServerApiVersion } from 'mongodb';

//
// const connectionURL = 'mongodb+srv://trongkami:Trongvip123!@cluster0.zee12.mongodb.net/web-enterprise?retryWrites=true&w=majority';
// const databaseName = 'task-app';
//
// await mongoose.connect(`${connectionURL}/${databaseName}`, {useNewUrlParser: true});


const url = "mongodb+srv://trongkami:Trongvip123!@cluster0.zee12.mongodb.net/web_enterprise?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true
}
await mongoose.connect(url,connectionParams)

await client.connect();

function saveUser() {

    const userInstance = new User({name: 'Trong', age: 22, email: 'trong@gmail.com', password: 'passwOrd'});

    userInstance
        .save()
        .then(() => {
            console.log(chalk.green(`Document Added: ${userInstance}`));
        }).catch((err) => {
        console.log(chalk.red(err));
    });
}



const myTask = new Task({complete: false});

function saveTask() {
    myTask
        .save()
        .then(() => {
            console.log(chalk.green(`Document Added: ${myTask}`));
        }).catch((err) => {
        console.log(chalk.red(err));
    });
}


saveUser();
//saveTask();