const db = require('../db/connection'); //this allows connection to DB to retrieve raw data

exports.fetchCategories = () =>{
    //query here
    return db.query('SELECT * FROM categories;').then((result) =>{
        return result.rows;
    });
}

exports.fetchReview = (review_id)=>{
    return db.query(`SELECT * FROM reviews where review_id=$1;`, [review_id]
    )
    .then((result) =>{
        return result.rows[0];
});
}
