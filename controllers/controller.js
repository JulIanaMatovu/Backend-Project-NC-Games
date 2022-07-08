const { fetchCategories, fetchReview, fetchUpdatedVotes } = require("../models/models");

exports.getCategories = (req, res, next) => {
    try {
        fetchCategories().then((categories) => {
            res.status(200).send(categories);
        });
    } catch (err) {
        next(err);
    }
};

exports.getReview = (req, res, next) => {
    const { review_id } = req.params;
    fetchReview(review_id)
        .then((review) => {
            res.status(200).send(review);
        })
        .catch((err) => {
            next(err);
        });
};

exports.updateVotes = (req, res, next) => {
    const review_id = req.params.review_id;
    const inc_votes = req.body;
    fetchUpdatedVotes(inc_votes, review_id, )
        .then((review) => {
            res.status(200).send(review);
        })

};