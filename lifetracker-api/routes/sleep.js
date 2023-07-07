const express = require("express");
const sleepRouter = express.Router();
const Sleep = require("../models/sleep");
const { getUserFromToken } = require("../middleware/security");

sleepRouter.post("/", async (request, response, next) => {
    console.log("received sleep post request", request.body);
    try {
       const entry =  await Sleep.createSleep(request.body);
       response.status(201).json({"sleep": entry})
    } catch (error){
        console.log("Error posting entry")
        next(error);
    }

})
sleepRouter.get("/", async (request, response, next) => {
    console.log("received sleep get request");
    try {
        const { email } = await getUserFromToken(request);
       const entries =  await Sleep.listSleepForUser(email);
       response.status(201).json({"sleeps": entries});
    } catch (error){
        
        next(error);
    }

})
sleepRouter.get("/:sleepId", async (request, response, next) => {
    console.log("received sleep getById request", request.params.sleepId);
    try {
        const entry = await Sleep.fetchSleepById(request.params.sleepId);
        response.status(201).json({"sleep": entry})
    } catch (error){
        next(error);
    }
})

module.exports = sleepRouter;