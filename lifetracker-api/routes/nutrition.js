const express = require("express");
const nutritionRouter = express.Router();
const Nutrition = require("../models/nutrition");
const { getUserFromToken } = require("../middleware/security");

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
        const { email } = await getUserFromToken(request);
        const entries = await Nutrition.listNutritionForUser(email);
        response.status(201).json({ "nutritions": entries });
    } catch (error) {
        console.log("error in nutrition route", error)
        next(error);
    }

})
nutritionRouter.get("/:nutritionId", async (request, response, next) => {
    console.log("received nutriton getById request", request.params.nutritionId);
    try {
        const entry = await Nutrition.fetchNutritionById(request.params.nutritionId);
        response.status(201).json({ "nutrition": entry })
    } catch (error) {
        next(error);
    }
})

module.exports = nutritionRouter;