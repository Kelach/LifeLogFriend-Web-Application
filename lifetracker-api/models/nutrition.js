// const db = require("../db") // postrgres db
const LifeTrackerResourceModel = require("./resource")

class Nutrition /* extends LifeTrackerResourceModel */ {

    static async createNutrition(data) {
        try {
            const requiredFields = ["name", "category", "calories", "quantity", "userId"]
            const psqlQuery =  `INSERT INTO nutrition (
                user_id,
                name,
                category,
                calories,
                quantity,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, to_timestamp($6))
            RETURNING user_id AS "userId",
                      name,
                      category,
                      calories,
                      quantity,
                      id,
                      created_at AS "createdAt"
            `
            const psqlQueryVariables = [data.userId,
                data.name,
                data.category,
                data.calories,
                data.quantity,
                Date.now() / 1000,
            ]
            const newEntry = await
                LifeTrackerResourceModel.createNewResourceEntry(
                    "nutrition", data, requiredFields, psqlQuery, psqlQueryVariables)

            return newEntry
        } catch (error) {
            throw error;
        }
    }
    static async fetchNutritionById(nutritionId) {
        console.log(nutritionId)
        try {
            const psqlQuery = `SELECT id,
                                user_id AS "userId",
                                name,
                                category,
                                calories,
                                quantity,
                                created_at AS "createdAt" FROM nutrition WHERE id = $1`;
            const psqlQueryVariables = [nutritionId]
            const newEntry = await LifeTrackerResourceModel.fetchResourceEntryById(psqlQuery, psqlQueryVariables)
            return newEntry
        } catch (error) {
            throw error;
        }

    }
    static async listNutritionForUser(userId) {
        try {
            const psqlQuery =  `SELECT id, 
                                user_id AS "userId",
                                name,
                                category,
                                calories,
                                quantity,
                                created_at AS "createdAt" FROM nutrition WHERE user_id=$1 `
            const psqlQueryVariables = [userId]
            const nutritionEntries = await LifeTrackerResourceModel.listResourceEntriesForUser(psqlQuery, psqlQueryVariables)
            return nutritionEntries
        } catch (error) {
            throw error;
        }
    }
    static async fetchNutritionStats(userId, statId){
        try {
            const nutritionStats = await LifeTrackerResourceModel.fetchResourceStats("nutrition",  userId, statId)
            return nutritionStats;
        } catch (error) {
            console.log("error getting stats: ", error)
            throw error;
        }
    }
}

module.exports = Nutrition;