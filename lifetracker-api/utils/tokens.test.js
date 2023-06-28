"use strict"

const { createUserJwt, validateToken } = require("./tokens");


describe("json web tokens", () => {

    test("jwt generates token properly", async () => {
        const userToken = createUserJwt({userID : "123",  userEmail : "myemail@email.com"})
        expect(userToken).toBeTruthy();
    });
    test("jwt properly validates token", async () => {
        const userToken = createUserJwt({userID : "123",  userEmail : "myemail@email.com"})
        const isVerified = validateToken(userToken);
        expect(isVerified).toBeTruthy();
        const isNotVerified = validateToken("1212aefrfefwr");
        expect(isNotVerified == false).toBeTruthy();
    });
})