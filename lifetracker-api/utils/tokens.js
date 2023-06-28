"use strict"

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");
const { InvalidTokenError } = require("./errors"); 
function generateToken(data){
    return jwt.sign(data, SECRET_KEY);
    // Returns a signed token using the sign function from the jsonwebtoken package.
}
function createUserJwt({userID, userEmail}){
    // create user payload with id and email
    const newUser = {
        id : userID,
        email : userEmail
    }
    return generateToken(newUser);
}
function validateToken(token){
    try{

        const verified = jwt.verify(token, SECRET_KEY);
        if (verified){
            return true;
        }
        throw new InvalidTokenError;
    } catch (error){
        console.log("Error caught while trying to verify token: ", token, "Error: ", error);
        return false;
    }
}

module.exports= {
    generateToken,
    createUserJwt,
    validateToken,
}