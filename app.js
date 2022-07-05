const express = require("express");
const {getCategories} = require('./controllers/controller');
const { handlesInvalidPath, handle500s } = require("./controllers/controllers.errors");

const app = express();

app.get("/api/categories", getCategories);
app.use("*", handlesInvalidPath); //this will handle invalid paths for all endpoints
app.use(handle500s);
module.exports = app;