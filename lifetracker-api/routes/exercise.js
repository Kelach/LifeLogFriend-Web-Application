const express = require("express");
const exerciseRouter = express.Router();
const { authedUserOwnsResource } = require("../middleware/permissions");

const Exercise = require("../models/exercise");

exerciseRouter.post("/", async (request, response, next) => {
    console.log("received exercise post request", request.body);
   try{
       const entry = await Exercise.createExercise(request.body);
        response.status(201).json({ "exercise": entry })
    } catch (error) {
        console.log("Error posting entry", error)
        next(error);
    }

});
exerciseRouter.get("/", async (request, response, next) => {
    console.log("received exercise get request");
    try {
        const { email } = response.locals.user;
        const exercises = await Exercise.listExerciseForUser(email);
        response.status(201).json({ "exercises": exercises });
    } catch (error) {
        console.log("error in exercise route", error)
        next(error);
    }

});
exerciseRouter.post("/stats", async (request, response, next) => {
    console.log("received exercise stats request");
    try {
        console.log(request.body);
        const { statId } = request.body;
        const { email } = response.locals.user;
        console.log(statId, email)
        const stats = await Exercise.fetchExerciseStats(email, statId);
        response.status(201).json({ "stats": stats });
    } catch (error) {
        next(error);
    }
});
exerciseRouter.get("/:exerciseId", authedUserOwnsResource, async (request, response, next) => {
    console.log("received exercise getById request", request.params.exerciseId);
    const exerciseEntry = response.locals.resourceEntry
    response.status(201).json(exerciseEntry)


});

module.exports = exerciseRouter;