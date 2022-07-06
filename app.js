const express = require("express");
const {getCategories, getReview} = require('./controllers/controller');
const { handlesInvalidPath, handle500s, handleCustomErrors } = require("./controllers/controllers.errors");

const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReview);
app.all("*", handlesInvalidPath); //this will handle invalid paths for all endpoints
app.use(handleCustomErrors);
app.use(handle500s);


module.exports = app;