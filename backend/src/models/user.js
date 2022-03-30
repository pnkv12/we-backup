import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator, * as otherValidator from 'validator';
import chalk from 'chalk';
import jwt from "jsonwebtoken";
import {Task} from "./task.js";
import {MongoClient, ServerApiVersion} from "mongodb";

// const connectionURL = 'mongodb+srv://trongkami:Trongvip123!@cluster0.zee12.mongodb.net/web_enterprise?retryWrites=true&w=majority';
// const databaseName = 'web_enterprise';
//
//
//
// await mongoose.connect(`${connectionURL}/${databaseName}`, {useNewUrlParser: true});

const url = "mongodb+srv://trongkami:Trongvip123!@cluster0.zee12.mongodb.net/web_enterprise?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true
}
await mongoose.connect(url,connectionParams)



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Not a right email address');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Cannot set password to "password"');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Người âm phủ ???');
            }
        }
    },
    sessionTokens: [{
        token: {
            type: String
        }
    }]
}, {
    timestamps:true
});

UserSchema.virtual('tasksOfUser', {
    ref: 'tasks',
    localField: '_id',
    foreignField: 'owner'
});

UserSchema.pre('save', async function (next) {
    const user = this;

    /*
    * isModified means CREATE and UPDATE too
    * */
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})


UserSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({owner: user._id});
    next();
});


UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email});

    if (user == null) {
        throw new Error('Email or password not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch == false) {
        throw new Error('Email or password not found');
    }

    return user;
}


UserSchema.methods.generateAuthToken = async function () {
    const user = this;

    const dataStoreInToken = {
        _id: user._id
    };

    const randomCharacters = 'web-enterprise';

    const generatedAuthToken = jwt.sign(dataStoreInToken, randomCharacters, {expiresIn: '7 days'});
    user.sessionTokens = user.sessionTokens.concat({token: generatedAuthToken});

    await user.save();
    return generatedAuthToken;
}


UserSchema.methods.getTaskOfUser = async function (userId) {
    const user = await User.findById(userId);
    await user.populate('tasksOfUser');
    return user.tasksOfUser;
}


export const User = mongoose.model('users', UserSchema);