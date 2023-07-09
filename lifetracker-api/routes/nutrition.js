const express = require("express");
const nutritionRouter = express.Router();
const Nutrition = require("../models/nutrition");

nutritionRouter.post("/", async (request, response, next) => {
    console.log("received nutriton post request", request.body);
    try {
        const entry = await Nutrition.createNutrition(request.body);
        response.status(201).json({ "nutrition": entry })
    } catch (error) {
        console.log("Error posting entry", error)
        next(error);
    }

})
nutritionRouter.get("/", async (request, response, next) => {
    console.log("received nutriton get request");
    try {
        const { email } = response.locals.user;
        const nutritions = await Nutrition.listNutritionForUser(email);
        response.status(201).json({ "nutritions": nutritions });
    } catch (error) {
        console.log("error in nutrition route", error)
        next(error);
    }

})
nutritionRouter.post("/stats", async (request, response, next) => {
    console.log("received nutriton stats request");
    try {
        console.log(request.body);
        const { statId } = request.body;
        const { email } = response.locals.user;
        console.log(statId, email)
        const stats = await Nutrition.fetchNutritionStats(email, statId);
        response.status(201).json({ "stats": stats });
    } catch (error) {
        next(error);
    }
});
nutritionRouter.get("/:nutritionId", async (request, response, next) => {
    console.log("received nutriton getById request", request.params.nutritionId);
    try {
        const entry = await Nutrition.fetchNutritionById(request.params.nutritionId);
        response.status(201).json({ "nutrition": entry })
    } catch (error) {
        next(error);
    }
});

module.exports = nutritionRouter;