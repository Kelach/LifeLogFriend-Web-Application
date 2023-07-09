const { UnauthorizedError, InvalidTokenError, UnexpectedError, NotFoundError } = require("../utils/errors");
const User = require("../models/user");
const LifeTrackerResourceModel = require("../models/resource");

async function authedUserOwnsResource(request, response, next){
    const { email } = response.locals.user;
    const resourceType = request.baseUrl.split("/")[1] // returns resourceType (e.g nutrition/exercise/sleep)
    console.log("retrieved resource type to verify user owns resource: ", resourceType)

    if (email){
        console.log("extracting from params: ", request.params)
        const resourceId = request.params[`${resourceType}Id`];
        try {
            // retrieve entry
            const entry = await LifeTrackerResourceModel.fetchResourceEntryById(resourceType, resourceId);
            // throw error if entry is not found
            if (!entry) throw new NotFoundError(resourceType, " with id: ",resourceId, "does not exist")
            //throw error if user does not have permission
            if (entry.userId && entry.userId !== email) throw new UnauthorizedError("User does not have permission to access this resource")
            // cache results
            response.locals.resourceEntry = { [resourceType] : entry }
            return next();    
        } catch (error) {
            console.log("error while trying to fetch resource by id: ", error)
            next(error);
        }
    }else{
        console.log("no email found")
        return next(UnauthorizedError("No email found in response.locals"))
    }
}
module.exports = { authedUserOwnsResource }