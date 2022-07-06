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
        if(result.rows[0] === undefined){
            return Promise.reject(
                {status: 404, msg:"review_id not found"}
            )
        }
        return result.rows[0];
});
}
