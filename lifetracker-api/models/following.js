const db = require("../db"); // postrgres db
const { BadRequestError } = require("../utils/errors");

class Following{
    static async getFollowing(userId){
        const results = await db.query(
            `SELECT DISTINCT follows
             FROM following
             WHERE user_id=$1`
            , [userId]);
        return results.rows
    }
    static async follow(userId, userToFollow){
        console.log(userId, userToFollow)
        const results = await db.query(
            `INSERT INTO following 
                (user_id, follows)
                VALUES ($1, $2) 
                RETURNING 
                    user_id AS "userId", 
                    follows`,
                [userId, userToFollow]);
        return results.rows[0]
    }
    static async unfollow(userId, userToUnfollow){
        const results = await db.query(
            `DELETE 
             FROM following 
             WHERE user_id=$1 AND follows=$2
             RETURNING user_id AS "userId", follows`
            , [userId, userToUnfollow]);
        return results.rows[0]
    }
}
module.exports = { Following }