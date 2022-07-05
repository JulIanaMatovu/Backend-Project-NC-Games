const {fetchCategories} = require("../models/models");

exports.getCategories = (req, res, next) => {
    try{
        fetchCategories().then((categories) => {
        res.status(200).send(categories);
        })
    }catch(err){
        next(err);
    }
   
};
