const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const contact = require("./src/router/contact-controller");
const cors = require("cors")
const app = express()

app.use(express.json());
app.use(cors());
app.use("/api", contact)

mongoose.connect(process.env.MONGODB).then(() => {
    console.log("Database connected..")
}).catch((error) => {
    console.log(error.message)
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT)
})