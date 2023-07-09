// import express and create auth routes
const express = require("express");
const { UnauthorizedError, BadRequestError, UnexpectedError, InvalidTokenError } = require("../utils/errors");
const User = require("../models/user");
const { createUserJwt } = require("../utils/tokens");
const { getUserFromToken, requireAuthenticatedUser } = require("../middleware/security");
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
        console.log("error trying to register user: ", error)
        return next(error);
    }
});

authRouter.post("/me", requireAuthenticatedUser, async (request, response, next) => {
    // request header should contain auth token
    try {
        const { user } = response.locals;
        console.log("retrieved: ", user)
        if (user) {
            response.status(200).json({ user: user });
        } else{
            console.log("no user found from repsonse locals: ", response.locals)
            next();
        }
    } catch (error) {
        console.log("unexpected error occured: ", error)
        next(error)
    }
});
authRouter.get("/all",requireAuthenticatedUser, async (request, response, next) => {
    // request header should contain auth token
    try {
        const { user } = response.locals;
        console.log("getting all user per request from user: ", user);
        if (user) {
            const allUsers = await User.fetchAllUsers();
            response.status(200).json({ users : allUsers });
        } else{
            console.log("no user found from repsonse locals: ", response.locals)
            throw new BadRequestError("no user found from repsonse locals: ");
        }
    } catch (error) {
        console.log("unexpected error occured: ", error)
        next(error)
    }
});
// handle login and regisration with the User model

module.exports = authRouter
