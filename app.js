const express = require("express");
const app = express();

app.use(express.json())

const user = require('./routes/userRoutes');
app.use('/',user);

const profile = require("./routes/profileRoutes");
app.use("/",profile);

module.exports = app;