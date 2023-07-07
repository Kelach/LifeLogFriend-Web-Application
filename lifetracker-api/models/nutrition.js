// const db = require("../db") // postrgres db
const LifeTrackerResourceModel = require("./resource")

class Nutrition /* extends LifeTrackerResourceModel */ {

    static async createNutrition(data) {
        try {
            const newEntry = await LifeTrackerResourceModel.createNewResourceEntry("nutrition", data)
            return newEntry
        } catch (error) {
            throw error;
        }
    }
    static async fetchNutritionById(nutritionId) {
        console.log(nutritionId)
        try {
            const newEntry = await LifeTrackerResourceModel.fetchResourceEntryById("nutrition", nutritionId)
            return newEntry
        } catch (error) {
            throw error;
        }

    }
    static async listNutritionForUser(userId) {
        try {
            const nutritionEntries = await LifeTrackerResourceModel.listResourceEntriesForUser("nutrition", userId)
            return nutritionEntries
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Nutrition;