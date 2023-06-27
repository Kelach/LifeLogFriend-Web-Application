// import express and create auth routes
const express = require("express");
const authRouter = express.Router(); // authentication router

authRouter.post("/login", (request, response, next) => {
    // use models to handle login
    try {
        console.log("hello new registered user")
    } catch (error){
        next(error);
    }
});
authRouter.post("/register", (request, response, next) => {P
    // use User model to handle User registration
    try {
        console.log("hello new registered user")
    } catch(error) {
        next(error);
    }
});
// handle login and regisration with the User model

module.exports = authRouter
