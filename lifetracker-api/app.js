// MIDDLEWARE
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// ROUTES + CONFIGS
const authRouter = require("./routes/auth");
const nutritionRouter = require("./routes/nutrition");
const followingRouter = require("./routes/following");
const { IS_TESTING } = require("./utils/config");
const { NotFoundError } = require("./utils/errors");
const { requireAuthenticatedUser } = require("./middleware/security");

//USING MIDDLEWARE
const app = express();
app.use(cors()); // cross origin resource sharing *need to restrict only to origin hosting front-end*
app.use(express.json()); // json pre-processing
app.use(morgan("tiny")); // console logging
app.use("/auth", authRouter); // authentication routes handler
app.use("/nutrition", requireAuthenticatedUser, nutritionRouter);
app.use("/exercise",requireAuthenticatedUser, );
app.use("/sleep", requireAuthenticatedUser, );
app.use("/following", requireAuthenticatedUser, followingRouter);

// ROUTES

// health check
app.get("/",  (req, res) => {
    return res.status(200).json({
      ping: "pong",
    })
  })
/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError())
})
/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (IS_TESTING) console.error(err.stack)
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: { message, status },
    })
})
  
  module.exports = app