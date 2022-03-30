import {MongoClient, ObjectId} from 'mongodb'
import chalk from "chalk";
import mongoose from "mongoose";


const url = "mongodb+srv://trongkami:Trongvip123!@cluster0.zee12.mongodb.net/web_enterprise?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
await mongoose.connect(url,connectionParams)


// MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
//     if(error){
//         console.log(chalk.red(`Cannot connect to MongoDB: ${error}`));
//     } else {
//         console.log(chalk.bgGreen.black(' SUCCESS CONNECTED TO MONGODB '));
//         const database = client.db(databaseName);
//     }
// });

/* ____________________________________________________ INSERT ____________________________________________________*/

function insertTest() {
    client.connect().then((client) => {
        console.log(chalk.bgGreen.black(` SUCCESS CONNECTED TO MONGODB !!! `));
        const database = client.db(databaseName);

        database.collection('users').insertMany([{
                name: 'Trong',
                age: 22,
            },
                {
                    name: 'Trong',
                    age: 23,
                },

                {
                    name: 'Trong',
                    age: 24,
                },

            ], (error, result) => {
                if (error) {
                    console.log(chalk.red(`Cannot Insert`));
                } else {
                    console.log(chalk.bgGreen.black(' SUCCESS INSERT '));
                    console.log(JSON.stringify(result));
                }
            }
        );

    }).catch((error) => {
        console.log(chalk.red(`Cannot connect to MongoDB: ${error}`));
    });
}

function insertTest2() {
    client.connect().then((client) => {
        console.log(chalk.bgGreen.black(` SUCCESS CONNECTED TO MONGODB !!! `));
        const database = client.db(databaseName);

        database.collection('tasks').insertMany([{
            _id: 1,
            description: 'Clean the house',
            complete: true,
        }, {
            _id: 2,
            name: 'Fix light',
            complete: false,
        },
            {
                _id: 3,
                name: 'Debug',
                complete: false,
            },
        ], (error, result) => {
            if (error) {
                console.log(chalk.red(`Cannot Insert`));
            } else {
                console.log(chalk.bgGreen.black(' SUCCESS INSERT '));
                console.log(JSON.stringify(result));
            }
        });


    }).catch((error) => {
        console.log(chalk.red(`Cannot connect to MongoDB: ${error}`));
    });

}

/* ____________________________________________________ READ ____________________________________________________*/

async function read() {

    await client.connect();
    const database = client.db(databaseName);

    database.collection('users').findOne({
        name: 'Trong'
    }, (error, result) => {
        if (error) {
            console.log(chalk.red(`Unable To Find`));
        } else {
            if (result == null) {
                console.log(chalk.bgGreen.black(' FOUND NOTHING !!! '));
            } else {
                console.log(chalk.bgGreen.black(` FOUND ${JSON.stringify(result)}`));
            }
        }
    });

    database.collection('users').findOne({
        name: 'Trong',
        age: 30
    }, (error, result) => {
        if (error) {
            console.log(chalk.red(`Unable To Find`));
        } else {
            if (result == null) {
                console.log(chalk.bgGreen.black(' FOUND NOTHING !!! '));
            } else {
                console.log(chalk.bgGreen.black(` FOUND ${JSON.stringify(result)}`));
            }
        }
    });

    database.collection('users').findOne({
        _id: new ObjectId("620e45705f9eff8e218c92b7"),
    }, (error, result) => {
        if (error) {
            console.log(chalk.red(`Unable To Find`));
        } else {
            if (result == null) {
                console.log(chalk.yellow(' FOUND NOTHING !!! '));
            } else {
                console.log(chalk.green(` FOUND ${JSON.stringify(result)}`));
            }
        }
    });

}

function read2() {
    client.connect().then((client) => {
        console.log(chalk.bgGreen.black(` SUCCESS CONNECTED TO MONGODB !!! `));
        const database = client.db(databaseName);

        const resultList = database.collection('users').find({
            name: 'Trong'
        });

        resultList.toArray((error, results) => {
            if (error) {
                console.log(chalk.red(`Unable To Find`));
            } else {
                if (results == null) {
                    console.log(chalk.yellow(' FOUND NOTHING !!! '));
                } else {
                    console.log(chalk.green(` FOUND ${JSON.stringify(results)}`));
                    console.log(chalk.green(` FOUND ${JSON.stringify(results[0])}`));
                }
            }

        });


    }).catch((error) => {
        console.log(chalk.red(`Cannot connect to MongoDB: ${error}`));
    });

}

/* ____________________________________________________ UPDATE ____________________________________________________*/

async function update() {
    await client.connect();
    const database = client.db(databaseName);

    const updateResult = database.collection('tasks').updateOne({_id: 1}, {$set: {complete: true}});

    updateResult.then((result) => {
        console.log(chalk.green('UPDATE SUCCESS documents =>'), result);
    }).catch((error) => {
        console.log(chalk.red('UPDATE FAIL =>'), error);
    });

}

async function update2() {
    await client.connect();
    const database = client.db(databaseName);

    const updateResult = database.collection('users').updateOne(
        {_id: new ObjectId('620e498b1379e27bbe251b83')},
        {
            $inc: {age: 1}
        });

    updateResult.then((result) => {
        console.log(chalk.green('UPDATE SUCCESS documents =>'), result);
    }).catch((error) => {
        console.log(chalk.red('UPDATE FAIL =>'), error);
    });

}

async function update3() {
    await client.connect();
    const database = client.db(databaseName);

    const updateResult = database.collection('tasks').updateMany(
        {complete: false},
        {
            $set: {complete: true}
        });

    updateResult.then((result) => {
        console.log(chalk.green('UPDATE SUCCESS documents =>'), result);
    }).catch((error) => {
        console.log(chalk.red('UPDATE FAIL =>'), error);
    });

}

/* ____________________________________________________ DELETE ____________________________________________________*/
async function myDelete() {
    await client.connect();
    const database = client.db(databaseName);

    database.collection('users').deleteMany(
        {age: 25}).then((result) => {
        console.log(chalk.green('DELETE SUCCESS documents =>'), result);
    }).catch((error) => {
        console.log(chalk.red('DELETE FAIL =>'), error);
    });
}

async function myDelete2() {
    await client.connect();
    const database = client.db(databaseName);

    database.collection('tasks').deleteOne(
        {name: 'Fix light'}).then((result) => {
        console.log(chalk.green('DELETE SUCCESS documents =>'), result);
    }).catch((error) => {
        console.log(chalk.red('DELETE FAIL =>'), error);
    });
}


//insertTest();
// await read();
//read2();

//await update();
//await update2();
//await update3();

//await myDelete();
await myDelete2();

