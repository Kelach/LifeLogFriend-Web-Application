const db = require("../db"); // postrgres db
const { validateFields } = require("../utils/validate");
const { BadRequestError } = require("../utils/errors");

class LifeTrackerResourceModel {
    constructor() {

    }
    static async createNewResourceEntry(resourceType, entryData, requiredFields, psqlQuery, psqlQueryVariables) {
        // creates new entry from a given resource type (nutrition, exercise, or others)

        try {
            validateFields({ required: requiredFields, obj: entryData, location: `new ${resourceType} entry` })
        } catch (err) {
            throw err
        }
        try {
            const result = await db.query(psqlQuery, psqlQueryVariables)
            return result.rows[0]
        } catch (error) {
            console.log("unable to uplaod entry to psql: ", error)
            throw error;
        }
    }
    static async fetchResourceEntryById(resourceType, entryID) {
        try{
            const result = await db.query(
                `SELECT *
                FROM ` + resourceType.toLowerCase() + ` WHERE id = $1`,
                [entryID.toLowerCase()]
            )
            return result.rows[0]
        }catch (error){
            console.log("unable to fetch resource: ", resourceType, "by id: ", entryID)
            throw error;
        }
    }
    static async listResourceEntriesForUser(resourceType, userId) {
        console.log("prepare list request", resourceType, userId)
        try{
            const result = await db.query(
                `SELECT * FROM ` + resourceType.toLowerCase() + ` WHERE user_id=$1 `
                , [userId]
            )
            return result.rows // returns list of nutrition objects
        }catch (error) {
            console.log("unable to fetch entries for resource type:", resourceType)
            throw error
        }
    }
    static async fetchResourceStats(resourceType, userId, statId){
        /**
         * @TODO update WHERE expression to include only entries
         * within a given time range
         */
        try{
            const sum = await db.query(
                `SELECT SUM(`+ `${statId}`  +`)
                FROM ` + resourceType.toLowerCase() + ` 
                WHERE user_id=$1 
                AND created_at >= date_trunc('week', current_date)
                AND created_at < date_trunc('week', current_date) + INTERVAL '1 week'`
                , [userId]
            )

            const average = await db.query(
                `SELECT round(AVG(`+ `${statId}::numeric`  +`), 2) as "avg"
                FROM ` + resourceType.toLowerCase() + ` WHERE user_id=$1`
                , [userId]
            )
            const max = await db.query(
                `SELECT MAX(`+ `${statId}`  +`)
                FROM ` + resourceType.toLowerCase() + ` WHERE user_id=$1`
                , [userId]
            )
            const min = await db.query(
                `SELECT MIN(`+ `${statId}`  +`)
                FROM ` + resourceType.toLowerCase() + ` WHERE user_id=$1`
                , [userId]
            )
            const count = await db.query(
                `SELECT COUNT(`+ `${statId}`  +`)
                FROM ` + resourceType.toLowerCase() + ` WHERE user_id=$1`
                , [userId]
            )
            // console.log(sum)
            return {...sum.rows[0], 
                ...average.rows[0], 
                ...max.rows[0], 
                ...min.rows[0], 
                ...count.rows[0]} // returns list of nutrition objects
        }catch (error) {
            console.log("unable to fetch stats for resource type:", resourceType)
            throw error
        }
    }

}
module.exports = LifeTrackerResourceModel