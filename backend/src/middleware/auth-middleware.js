import {response} from "express";
import jwt from "jsonwebtoken";
import {User} from "../models/user.js";

export const authMiddleware = async (request, response, next) => {
    console.log('Auth middleware called');

    try {
        const authTokenInHeader = request.header('Authorization').replace('Bearer ','');
        const dataInAuthToken = jwt.verify(authTokenInHeader, 'web-enterprise');

        const user = await User.findOne({_id: dataInAuthToken._id, 'tokens.token': authTokenInHeader});

        if(user==null){
            throw new Error();
        }

        request.authTokenInHeader = authTokenInHeader;
        request.user = user;
        console.log(request.user);
        next();
    } catch (error) {
        response.status(401).send({error: "Authentication error"});
    }
}

