"use strict"

const db = require("../db") // postrgres db
const bcrypt = require("bcrypt") // authentication encryption
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate") 

const { BCRYPT_WORK_FACTOR } = require("../utils/config")
const { createUserJwt } = require("../utils/tokens")

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {User} user - user from database
   * @returns public user
   */
    static _createPublicUser({id, firstName, lastName, email, date}) {
      return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }
    }

  /**
   * Authenticate user with email and password.
   *
   * Throws UnauthorizedError if user not found or wrong password.
   *
   * @returns user
   **/

  static async login(creds) {
    const { email, password } = creds
    const requiredCreds = ["email", "password"]
    try {
      validateFields({ required: requiredCreds, obj: creds, location: "user authentication" })
    } catch (err) {
      throw err
    }

    const user = await User.fetchUserByEmail(email)
    if (user) {
      console.log("comparing passwords", password, user.password)
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password)
      if (isValid === true) {
        return User._createPublicUser(user);
      }
      console.log("user exists with different password");
    }
    throw new UnauthorizedError("Invalid username/password")
  }

  /**
   * Register user with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns user
   **/

  static async register(creds) {
    const requiredCreds = ["email", "password", "firstName", "lastName", "username"]
    try {
      validateFields({ required: requiredCreds, obj: creds, location: "user registration" })
    } catch (err) {
      throw err
    }

    const existingUserWithEmail = await User.fetchUserByEmail(creds.email)
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${creds.email}`)
    }

    const hashedPassword = await bcrypt.hash(creds.password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = creds.email.toLowerCase()
    console.log("sending ting");
    const result = await db.query(
      `INSERT INTO users (
          password,
          username,
          first_name,
          last_name,
          email,
          created_at,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, to_timestamp($6), to_timestamp($7))
        RETURNING id,
                  email,            
                  first_name AS "firstName", 
                  last_name AS "lastName",
                  created_at AS "createdAt"
                  `,
      [hashedPassword,
        creds.username,
        creds.firstName,
        creds.lastName,
        normalizedEmail,
        Date.now()/1000,
        Date.now()/1000]
    )

    const userData = result.rows[0]
    console.log("UserData", userData)
    const userToken = createUserJwt({userID:  userData.id, userEmail : userData.email});
    console.log("recieved token: ", userToken);
    return {...userData, token: userToken};
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns user
   */
  static async fetchUserByEmail(email) {
    console.log("getting user by email")
    const result = await db.query(
      `SELECT id,
            email,            
            first_name AS "firstName", 
            last_name AS "lastName",
            created_at AS "createdAt"   ,
            password     
            FROM users
            WHERE email = $1`,
      [email.toLowerCase()]
    )
    const user = result.rows[0]
    console.log("fetched user from psql: ", user)

    return user
  }

  /**
   * Fetch a user in the database by id
   *
   * @param {String} userId
   * @returns user
   */
  static async fetchById(userId) {
    const result = await db.query(
      `SELECT id,
              email,    
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              created_at,
           FROM users
           WHERE id = $1`,
      [userId]
    )
    return result.rows[0]
  }
  static async fetchAllUsers(){

    const result = await db.query(`SELECT email,
            first_name AS "firstName",
            last_name AS "lastName",
            created_at AS "createdAt"
            FROM users`)
    
    return result.rows;
  }

}
module.exports = User