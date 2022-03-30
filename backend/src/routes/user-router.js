import express, { response } from 'express';
import { User } from "../models/user.js";
import chalk from "chalk";
import { ObjectId } from "mongodb";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { Task } from "../models/task.js";
import multer from "multer";

export const router = new express.Router();

/* ============================================ CREATE / REGISTER ============================================ */
router.post('/users', async (request, response) => {
    const user = new User(request.body);
    try {
        await user.save();
        //const authToken = await user.generateAuthToken();
        response.status(201).send({ "user": user });
    } catch (error) {
        console.log(chalk.red(error));
    }
});



/* ============================================ READ ============================================ */

router.get('/users', async (request, response) => {
    const filter = {}
    if(request.query.search) {
        filter.name = RegExp(".*"+request.query.search+".*");
    }
    try {
        const foundUsers = await User.find(filter);
        // console.log(request.name);
        if (foundUsers == null) {
            repose.status(404).send('USERS NOT FOUND');
        } else {
            response.status(200).send(`${JSON.stringify(foundUsers)}`);
        }
    } catch (error) {
        response.status(500).send(`${error}`);
    }
});


router.get('/users/me', authMiddleware, async (request, response) => {
    try {
        const tasksOfUser = await Task.find({ owner: request.user._id });
        // response.status(200).send(`YOU\n${request.user}\nTasks\n${tasksOfUser}`);
        response.status(200).send(`${request.user._id}`);
    } catch (error) {
        response.status(500).send(`${error}`);
    }
});


router.get('/users/:id', async (request, response) => {
    const _idParam = request.params.id;

    try {
        const foundUser = await User.findOne({ _id: new ObjectId(_idParam) });
        const tasksOfUser = await foundUser.getTaskOfUser(_idParam);

        if (foundUser == null) {
            response.status(404).send(`USER NOT FOUND`);
        } else {
            response.status(200).send(foundUser);
        }

    } catch (error) {
        response.status(500).send(`${error}`);
    }

});


/* ============================================ UPDATE ============================================ */

router.patch('/users/me', authMiddleware, async (request, response) => {

    const fieldsUpdated = Object.keys(request.body);
    const fieldAllowUpdate = ['name', 'email', 'password', 'age'];

    const isValidField = fieldsUpdated.every(field => fieldAllowUpdate.includes(field));

    if (!isValidField) {
        response.status(500).send("You must update exactly fields");
        return;
    }

    try {
        if (request.user == null) {
            response.status(404).send("User not found");
        } else {
            fieldsUpdated.forEach((field) => {
                request.user[field] = request.body[field];
            })
            await request.user.save();
            response.send(`UPDATED: ${request.user}`);
        }

    } catch (error) {
        response.status(400).send(`${error}`);
    }
});


router.patch('/users/:id', authMiddleware, async (request, response) => {

    const fieldsUpdated = Object.keys(request.body);
    // const fieldAllowUpdate = ['name', 'email', 'password', 'age'];
    const fieldAllowUpdate = ['name', 'email', 'age'];

    const isValidField = fieldsUpdated.every(field => fieldAllowUpdate.includes(field));

    if (!isValidField) {
        response.status(500).send("You must update exactly fields");
        return;
    }

    const _idParam = request.params.id;

    try {
        const updatedUser = await User.findOne({ _id: new ObjectId(_idParam) });

        if (updatedUser == null) {
            response.status(404).send("User not found");
        } else {
            /**
             * Đoạn code này đã bị thay đổi thay vì dùng findByIdAnUpdate( )
             * vì middleware chỉ được fire khi ta dùng save( )
             */
            fieldsUpdated.forEach((field) => {
                updatedUser[field] = request.body[field];
            })
            await updatedUser.save();
            response.send(`UPDATED: ${updatedUser}`);
        }

    } catch (error) {
        response.status(400).send(`${error}`);
    }
});




/* ============================================ DELETE ============================================ */
router.delete('/users/me', authMiddleware, async (request, response) => {
    try {
        await request.user.remove();
        response.status(200).send(`DELETED: ${request.user}`);
    } catch (error) {
        response.status(400).send(`${error}`);
    }
});


router.delete('/users/me', authMiddleware, async (request, response) => {

    try {
        const deletedUser = await User.findOne({ _id: request.user._id });

        if (deletedUser == null) {
            response.status(404).send("User not found");
        } else {
            await deletedUser.remove();
            response.status(200).send(`DELETED: ${deletedUser}`);
        }


    } catch (error) {
        response.status(400).send(`${error}`);
    }
});


router.delete('/users/:id', authMiddleware, async (request, response) => {
    const _idParam = request.params.id;

    try {
        const deletedUser = await User.findOne({ _id: new ObjectId(_idParam) });

        if (deletedUser == null) {
            response.status(404).send("User not found");
        } else {
            await deletedUser.remove();
            response.status(200).send(`DELETED: ${deletedUser}`);
        }


    } catch (error) {
        response.status(400).send(`${error}`);
    }
});


/* ================================================ LOGIN ============================================= */
router.post('/users/login', async (request, response) => {
    try {
        const foundUser = await User.findByCredentials(request.body.email, request.body.password);
        console.log(foundUser);
        const authToken = await foundUser.generateAuthToken();
        response.status(200).json({ "user": foundUser, "token": authToken });
    } catch (error) {
        response.status(400).send(`Something went wrong ${error}`);
    }
})


/* ================================================ LOGOUT ================================================ */
router.post('/users/logout', authMiddleware, async (request, response) => {
    try {
        request.user.sessionTokens = request.user.sessionTokens.filter((token) => {
            return token.token !== request.authTokenInHeader;
        });

        await request.user.save();
        response.status(200).send(`User with token ${request.authTokenInHeader} are logout`);

    } catch (error) {
        response.status(400).send(`Something went wrong ${error}`);
    }
})


router.post('/users/logoutAll', authMiddleware, async (request, response) => {
    try {
        request.user.sessionTokens = []
        await request.user.save();
        response.status(200).send('All user are logout');

    } catch (error) {
        response.status(400).send(`Something went wrong ${error}`);
    }
})


/* ======================================================= UPLOAD AVATARS ======================================================= */
const upload = multer({
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

router.post('/users/me/avatar', upload.single("upload"), (request, response) => {
    console.log(request.file);
    console.log(request.file.buffer);
    response.status(200).send(request.file);
}, (error, request, response, next) => {

    response.status(400).send({ error: error.message });
});