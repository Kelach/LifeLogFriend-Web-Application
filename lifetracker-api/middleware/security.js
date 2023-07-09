const jwt = require("jsonwebtoken");
const { validateToken } = require("../utils/tokens");
const { UnauthorizedError, InvalidTokenError, UnexpectedError } = require("../utils/errors");
const { fetchUserByEmail } = require("../models/user");

function getJWT(request){
    const authToken = request.headers["bearer"];
    console.log("processed token: ", authToken);
    if (!authToken || authToken == "undefined" || authToken == "null"){
        console.log("invalid header: ", request.headers)
        throw new UnauthorizedError("Invalid header found");
    }
    console.log("getting bearer", authToken);
    return authToken;
};
async function getUserFromToken(request){
    try{
        const userToken = getJWT(request);
        console.log("user token: ", userToken);
        const decodedToken = await validateToken(userToken);
        if (!decodedToken)
            throw new InvalidTokenError
        const user = await fetchUserByEmail(decodedToken.email);
        return user;
    } catch (error){
        if (error instanceof UnauthorizedError){
            throw error
        }else{
            console.warn("Unexpected error: ", error);
            throw UnexpectedError("unexpected error in getUserFromToken function: ", error);
        }
    }
}
async function requireAuthenticatedUser(request, response, next){
    console.log("verfiying user");

    // if token exists, check user exists 
    try {
        const user = await getUserFromToken(request)
        console.log("retrieved user: ", user)
        if (!user){
            console.log("access forbidden page");
            return next(new UnauthorizedError);
        }

        response.locals.user = user;
        console.log("valid users. access granted", user);
        return next();

    } catch (error){
        // otherwise throw error
        if (error instanceof UnauthorizedError){
            console.log("Unauthorizaed user");
            return next(error);
        } else{
            console.log("Unexpected error occured trying to verify user");
            return next(error);
        }
    }
}

module.exports = {
    getUserFromToken,
    requireAuthenticatedUser,
    getJWT
};
