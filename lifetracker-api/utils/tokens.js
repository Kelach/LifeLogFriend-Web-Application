"use strict"

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");
const { InvalidTokenError } = require("./errors"); 

function generateToken(data){
    return jwt.sign(data, SECRET_KEY);
    // Returns a signed token using the sign method from the jsonwebtoken package.
}
function createUserJwt({userID, userEmail}){
    // create user payload with id and email
    const payload = {
        id : userID,
        email : userEmail
    }
    return generateToken(payload);
}
function validateToken(token){
    // token validation
    try{
        const decodedToken = jwt.verify(token, SECRET_KEY);
        if (decodedToken){
            return decodedToken;
        }
        throw new InvalidTokenError;
    } catch (error){
        // only catch invalid token error
        if (error instanceof InvalidTokenError){    
            console.log("Invalid token");
            return undefined;
        }
        console.log("Error caught while trying to verify token: ", token, "Error: ", error);
        throw error;
    }
}

module.exports= {
    generateToken,
    createUserJwt,
    validateToken,
}