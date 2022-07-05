const db = require('../db/connection'); //this allows connection to DB to retrieve raw data

exports.fetchCategories = () =>{
    //query here
    return db.query('SELECT * FROM categories;').then((result) =>{
        return result.rows;
    });
}
