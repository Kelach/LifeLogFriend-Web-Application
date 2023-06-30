"use strict"

const { InvalidTokenError } = require("./errors");
const { createUserJwt, validateToken } = require("./tokens");


describe("json web tokens", () => {

    test("jwt generates token properly", async () => {
        const userToken = createUserJwt({userID : "123",  userEmail : "myemail@email.com"})
        expect(userToken).toBeTruthy();
    });
    test("jwt properly validates token", async () => {
        expect.assertions(1)
        const userToken = createUserJwt({userID : "1234",  userEmail : "myemail@email.com"})
        const decodedToken = validateToken(userToken);
        const {id, email, iat} = decodedToken;
        expect(id == "1234").toBeTruthy();
        const invalidTokenErorr = validateToken("1212aefrfefwr");
        expect(invalidTokenErorr instanceof InvalidTokenError == true).toBeTruthy();
    });
})