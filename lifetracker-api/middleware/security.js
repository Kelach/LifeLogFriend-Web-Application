const jwt = require("jsonwebtoken");
const { validateToken } = require("../utils/tokens");
const { UnauthorizedError, InvalidTokenError, BadRequestError } = require("../utils/errors");
const { fetchUserByEmail } = require("../models/user");

function getJWT(request){
    console.log(request.headers)
    const processedHeader = request.headers["authorization"]?.split(" ");
    console.log("processed header", processedHeader);
    if (!processedHeader){
        throw new UnauthorizedError("Invalid header found");
    }
    console.log("getting heaer", processedHeader);
    [authName, authToken] = processedHeader;
    if (authName !== "Bearer")
        throw new UnauthorizedError("Invalid header found");
    console.log("extracted token: ", authToken)
    return authToken;
}
async function getUserFromToken(request){
    const userToken = getJWT(request);
    try{
        const decodedToken = await validateToken(userToken);
        if (!decodedToken)
            throw new InvalidTokenError
        const user = await fetchUserByEmail(decodedToken.email);
        return user;
    } catch (error){
        console.warn("Unexpected error: ", error);
        throw UnexpectedError("unexpected error in getUserFromToken function: ", error);
    }
}
async function requireAuthenticatedUser(request, response, next){
    console.log("verfiying user");
    // if token exists, check user exists 
    try {
        const user = await getUserFromToken(request)
        if (!user){
            console.log("access forbidden page");
            return next(new UnauthorizedError);

        }
    } catch (error){
        // otherwise throw error
        if (error instanceof UnauthorizedError){
            console.log("Unauthorizaed user");
            return next(error);
        }
        throw next(error);
    }
    console.log("invalid user");
    return next(new BadRequestError("Non-existent token"));
}
module.exports = {
    getUserFromToken,
    requireAuthenticatedUser,
    getJWT
};
