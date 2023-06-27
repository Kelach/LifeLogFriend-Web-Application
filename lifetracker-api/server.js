"use strict"

const app = require("./app");
const { PORT } = require("./server/utils/config");
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// const authRouter = require("express");
