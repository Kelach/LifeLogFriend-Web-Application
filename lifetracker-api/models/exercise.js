const LifeTrackerResourceModel = require("./resource")

// extend from base class and to implement fetches by iD
class Exercise {
    static async createExercise(data) {
        try {
            const newEntry = await LifeTrackerResourceModel.createNewResourceEntry("exercise", data)
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
    static async listExerciseForUser(exerciseId) {
        try {
            const exerciseEntries = await LifeTrackerResourceModel.listResourceEntriesForUser("exercise", exerciseId)
            return exerciseEntries
        } catch (error) {
            throw error;
        }
    }
}
module.exports = Exercise;