const { UnauthorizedError, InvalidTokenError, UnexpectedError, NotFoundError } = require("../utils/errors");
const User = require("../models/user");
async function authedUserOwnsNutrition(request, response, next){
    const { email } = response.locals.user;
    if (email){
        const { id } = request.params;
        
    }else{
        console.log("no email found")
    }
}