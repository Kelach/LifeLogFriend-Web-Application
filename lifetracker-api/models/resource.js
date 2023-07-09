const db = require("../db"); // postrgres db
const { validateFields } = require("../utils/validate");
const { BadRequestError } = require("../utils/errors");

class LifeTrackerResourceModel {
    constructor() {

    }
    static async createNewResourceEntry(resourceType, entryData) {
        // creates new entry from a given resource type (nutrition, exercise, or others)

        const requiredFields = ["name", "category", "calories", "quantity", "userId"]
        try {
            validateFields({ required: requiredFields, obj: entryData, location: `new ${resourceType} entry` })
        } catch (err) {
            throw err
        }
        try {

            const result = await db.query(
                `
                INSERT INTO ` + resourceType.toLowerCase() +  ` (
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
                `, [entryData.userId,
                entryData.name,
                entryData.category,
                entryData.calories,
                entryData.quantity,
                Date.now() / 1000,
            ]
            )
            return result.rows[0]
        } catch (error) {
            console.log("unable to uplaod entry to psql: ", error)
            throw error;
        }
    }
    static async fetchResourceEntryById(resourceType, entryID) {
        try{
            const result = await db.query(
                `SELECT id,
                user_id AS "userId",
                name,
                category,
                calories,
                quantity,
                created_at AS "createdAt" FROM ` + resourceType.toLowerCase() + ` WHERE id = $1`,
                [entryID.toLowerCase()]
            )
            return result.rows[0]
        }catch (error){
            console.log("unable to fetch resource: ", resourceType, "by id: ", entryID)
            throw error;
        }
    }
    static async listResourceEntriesForUser(resourceType, userId) {
        try{
            const result = await db.query(
                `SELECT id, 
                user_id AS "userId",
                name,
                category,
                calories,
                quantity,
                created_at AS "createdAt" FROM ` + resourceType.toLowerCase() + ` WHERE user_id=$1 `
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
                FROM ` + resourceType.toLowerCase() + ` WHERE user_id=$1`
                , [userId]
            )

            const average = await db.query(
                `SELECT AVG(`+ `${statId}`  +`)
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