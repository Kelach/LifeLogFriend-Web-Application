const express = require("express");
const sleepRouter = express.Router();
const { authedUserOwnsResource } = require("../middleware/permissions");

const Sleep = require("../models/sleep");

sleepRouter.post("/", async (request, response, next) => {
    console.log("received sleep post request", request.body);
   try{
       const entry = await Sleep.createSleep(request.body);
        response.status(201).json({ "sleep": entry })
    } catch (error) {
        console.log("Error posting entry", error)
        next(error);
    }

});
sleepRouter.get("/", async (request, response, next) => {
    console.log("received sleep get request");
    try {
        const { email } = response.locals.user;
        const sleeps = await Sleep.listSleepForUser(email);
        response.status(201).json({ "sleeps": sleeps });
    } catch (error) {
        console.log("error in sleep route", error)
        next(error);
    }

});
sleepRouter.post("/stats", async (request, response, next) => {
    console.log("received sleep stats request");
    try {
        console.log(request.body);
        const { statId } = request.body;
        const { email } = response.locals.user;
        console.log(statId, email)
        const stats = await Sleep.fetchSleepStats(email, statId);
        response.status(201).json({ "stats": stats });
    } catch (error) {
        next(error);
    }
});
sleepRouter.get("/:sleepId", authedUserOwnsResource, async (request, response, next) => {
    console.log("received sleep getById request", request.params.sleepId);
    const sleepEntry = response.locals.resourceEntry
    response.status(201).json(sleepEntry)


});

module.exports = sleepRouter;