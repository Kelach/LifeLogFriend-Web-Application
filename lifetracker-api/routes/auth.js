// import express and create auth routes
const express = require("express");
const { UnauthorizedError, BadRequestError, UnexpectedError, InvalidTokenError } = require("../utils/errors");
const User = require("../models/user");
const { createUserJwt } = require("../utils/tokens");
const { getUserFromToken } = require("../middleware/security");
const authRouter = express.Router(); // authentication router

authRouter.post("/login", async (request, response, next) => {
    // use models to handle login
    const { email, password } = request.body;
    console.log("getting token from input: ", email, password);
    if (email && password){
        try {
            // authorization
            const user = await User.login({email : email, password : password});
            console.log("retrieved user: ", user);
            const userToken = createUserJwt({userID : user.id, userEmail: email});
            console.log("user token generated", userToken);
            response.status(200).json({"token" : userToken});
            return;
        }catch (error){
            if (error instanceof UnauthorizedError){
                console.log("unauth access");
                next(error);
            } else if (error instanceof InvalidTokenError){
                console.log("unauthrorized user");
            }
            console.warn("An unexpected error occured", error);
            next(UnexpectedError);
            return
        }
    }else{
        console.log(("error, email and/or password not provided"));
        next(BadRequestError);
    }
});
authRouter.post("/register", async (request, response, next) => {
    // use User model to handle User registration
    try {
        if (request.body){
            console.log("request body:", request.body)
            const newUser = await User.register(request.body);
            console.log("new user: ", newUser);
            response.json({user: newUser});
            return;
        }
        throw new BadRequestError("No body data recieved");
    } catch(error) {
        return next(error);
    }
});

authRouter.post("/me", async (request, response) => {
    // request header should contain auth token
    const user = getUserFromToken(request);
    if (user){
        response.status(200).send({ user : user});
        return
    }
    throw new UnauthorizedError;
});
// handle login and regisration with the User model

module.exports = authRouter
