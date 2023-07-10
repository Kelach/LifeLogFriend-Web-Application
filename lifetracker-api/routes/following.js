const express = require("express");
const followingRouter = express.Router();
const { Following } = require("../models/following");
// const { requireAuthenticatedUser } = require("../middleware/security");

followingRouter.get("/", async (request, response, next) => {
    console.log("recieved request to get all user following")

    // gets all users a given user is following
    try {
        const { email } = response.locals.user;
        if (email){
            const followingObjList = await Following.getFollowing(email);
            console.log("retrieved following from db", followingObjList);
            response.status(200).json({following : followingObjList.map((obj) => obj.follows)});
        }else{
            console.log("res.locals is empty while fetching all following: ", response.locals.user);
        }
    }catch (error){
        console.log("unable to get all following from database: ", error)
        next(error)
    }
})
followingRouter.post("/", async (request, response, next) => {
    // adds new user to a given users following
    console.log("recieved request to follow user");
    try {
        const { email } = response.locals.user;
        const { userToFollowEmail } = request.body;

        if (userToFollowEmail && email){
            const followedUserId = await Following.follow(email, userToFollowEmail);
            console.log("retrieved followers from db")
            response.status(200).json({followed : followedUserId})
        }else{
            console.log(`res.locals is empty or no user email to 
            follow was provided while fetching all following: `, response.locals.user)
        }
    }catch (error){
        console.log("unable to get to follow user: ", error)
        next(error)
    }
})
followingRouter.delete("/", async (request, response, next) => {
    console.log("recieved request to unfollow user");
    // removes a user from a given users following
    try {
        const { email } = response.locals.user;
        const { userToUnfollowEmail } = request.body;
        if (userToUnfollowEmail && email){
            const unfollowedUserId = await Following.unfollow(email, userToUnfollowEmail);
            console.log("retrieved followers from db");
            response.status(200).json({unfollowed : unfollowedUserId});
        }else{
            console.log("res.locals is empty or no user given while removing user ", response.locals.user)
        }
    }catch (error){
        console.log("unable unfollow user from database: ", error)
        next(error)
    }
});
module.exports = followingRouter;
