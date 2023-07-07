const db = require("../db") // postrgres db
const LifeTrackerResourceModel  = require("./resource")

// extend from base class to implement fetches by iD
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
    static async listNutritionForUser(nutritionId) {
        try {
            const nutritionEntries = await LifeTrackerResourceModel.listResourceEntriesForUser("nutrition", nutritionId)
            return nutritionEntries
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Nutrition;