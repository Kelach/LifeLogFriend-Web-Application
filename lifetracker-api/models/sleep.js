// const db = require("../db") // postrgres db
const LifeTrackerResourceModel = require("./resource")

class Sleep /* extends LifeTrackerResourceModel */ {

    static async createSleep(data) {
        try {
            const requiredFields = ["name", "category", "start_time", "end_time", "duration", "user_id"]
            const psqlQuery = `INSERT INTO sleep (
                user_id,
                name,
                category,
                start_time,
                end_time,
                duration
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING user_id,
                      name,
                      category,
                      start_time,
                      end_time,
                      id,
                      created_at`
            const psqlQueryVariables = [data.user_id,
            data.name,
            data.category,
            data.start_time,
            data.end_time,
            data.duration]
            const newEntry = await
                LifeTrackerResourceModel.createNewResourceEntry(
                    "sleep", data, requiredFields, psqlQuery, psqlQueryVariables)
            return newEntry
        } catch (error) {
            throw error;
        }
    }
    
    static async fetchSleepById(sleepId) {
        console.log(sleepId)
        try {
            const newEntry = await LifeTrackerResourceModel.fetchResourceEntryById("sleep", sleepId)
            return newEntry
        } catch (error) {
            throw error;
        }

    }
    static async listSleepForUser(userId) {
        try {
            const sleepEntries = await LifeTrackerResourceModel.listResourceEntriesForUser("sleep", userId)
            return sleepEntries
        } catch (error) {
            throw error;
        }
    }
    static async fetchSleepStats(userId, statId) {
        try {
            const sleepStats = await LifeTrackerResourceModel.fetchResourceStats("sleep", userId, statId)
            return sleepStats;
        } catch (error) {
            console.log("error getting stats: ", error)
            throw error;
        }
    }
}

module.exports = Sleep;