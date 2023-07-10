// const db = require("../db") // postrgres db
const LifeTrackerResourceModel = require("./resource")

class Exercise /* extends LifeTrackerResourceModel */ {

    static async createExercise(data) {
        try {
            const requiredFields = ["name", "category", "calories_burned", "duration", "userId"]
            const psqlQuery = `INSERT INTO exercise (
                user_id,
                name,
                category,
                calories_burned,
                duration
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING user_id AS "userId",
                      name,
                      category,
                      calories_burned AS "caloriesBurned",
                      duration,
                      id,
                      created_at AS "createdAt"`
            const psqlQueryVariables = [data.userId,
            data.name,
            data.category,
            data.calories_burned,
            data.duration]
            const newEntry = await
                LifeTrackerResourceModel.createNewResourceEntry(
                    "exercise", data, requiredFields, psqlQuery, psqlQueryVariables)
            return newEntry
        } catch (error) {
            throw error;
        }
    }
    
    static async fetchExerciseById(exerciseId) {
        console.log(exerciseId)
        try {
            const newEntry = await LifeTrackerResourceModel.fetchResourceEntryById("exercise", exerciseId)
            return newEntry
        } catch (error) {
            throw error;
        }

    }
    static async listExerciseForUser(userId) {
        try {
            const exerciseEntries = await LifeTrackerResourceModel.listResourceEntriesForUser("exercise", userId)
            return exerciseEntries
        } catch (error) {
            throw error;
        }
    }
    static async fetchExerciseStats(userId, statId) {
        try {
            const exerciseStats = await LifeTrackerResourceModel.fetchResourceStats("exercise", userId, statId)
            return exerciseStats;
        } catch (error) {
            console.log("error getting stats: ", error)
            throw error;
        }
    }
}

module.exports = Exercise;