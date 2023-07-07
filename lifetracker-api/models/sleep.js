const LifeTrackerResourceModel = require("./resource")
// extend from base class and to implement fetches by iD
class Sleep{

    static async createSleep(data) {
        try {
            const newEntry = await LifeTrackerResourceModel.createNewResourceEntry("sleep", data)
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
    static async listSleepForUser(sleepId) {
        try {
            const sleepEntries = await LifeTrackerResourceModel.listResourceEntriesForUser("sleep", sleepId)
            return sleepEntries
        } catch (error) {
            throw error;
        }
    }
}
module.exports = Sleep;