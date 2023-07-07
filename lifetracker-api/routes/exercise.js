const express = require("express");
const exerciseRouter = express.Router();
const Exercise = require("../models/exercise");
const { getUserFromToken } = require("../middleware/security");

exerciseRouter.post("/", async (request, response, next) => {
    console.log("received exercise post request", request.body);
    try {
        const entry = await Exercise.createExercise(request.body);
        response.status(201).json({ "exercise": entry })
    } catch (error) {
        console.log("Error posting entry")
        next(error);
    }

})
exerciseRouter.get("/", async (request, response, next) => {
    console.log("received exercise get request");
    try {

        const { email } = await getUserFromToken(request);
        const entries = await Exercise.listExerciseForUser(email);
        response.status(201).json({ "exercises": entries });
    } catch (error) {
        console.log(error)
        next(error);
    }

})
exerciseRouter.get("/:exerciseId", async (request, response, next) => {
    console.log("received exercise getById request", request.params.exerciseId);
    try {
        const entry = await Exercise.fetchExerciseById(request.params.exerciseId);
        response.status(201).json({ "exercise": entry })
    } catch (error) {
        next(error);
    }
})

module.exports = exerciseRouter;