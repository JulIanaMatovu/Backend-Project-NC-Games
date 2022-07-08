const express = require("express");
const { getCategories, getReview, updateVotes } = require('./controllers/controller');
const { handlesInvalidPath, handle500s, handleCustomErrors, handlePSQLErrors } = require("./controllers/controllers.errors");

const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReview);

app.use(express.json());
app.patch("/api/reviews/:review_id", updateVotes);
app.all("*", handlesInvalidPath); //this will handle invalid paths for all endpoints
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle500s);


module.exports = app;