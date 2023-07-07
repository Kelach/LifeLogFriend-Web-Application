const express = require("express");
const nutritionRouter = express.Router();
const Nutrition = require("../models/nutrition");

nutritionRouter.post("/", async (request, response, next) => {
    console.log("received nutriton post request", request.body);
    try {
       const entry =  await Nutrition.createNutrition(request.body);
       response.status(201).json({"nutrition": entry})
    } catch (error){
        console.log("Error posting entry")
        next(error);
    }

})
nutritionRouter.get("/", async (request, response, next) => {
    console.log("received nutriton get request", request.body);
    try {
       const entries =  await Nutrition.listNutritionForUser(request.body.userId);
       response.status(201).json({"nutritions": entries});
    } catch (error){
        next(error);
    }

})
nutritionRouter.get("/:nutritionId", async (request, response, next) => {
    console.log("received nutriton getById request", request.params.nutritionId);
    try {
        const entry = await Nutrition.fetchNutritionById(request.params.nutritionId);
        response.status(201).json({"nutrition": entry})
    } catch (error){
        next(error);
    }
})

module.exports = nutritionRouter;