//middleware functions that handle errors

exports.handlesInvalidPath = (req, res) =>{
    res.status(404).send({msg: "Invalid Path"});
};

//handles any errors that may arise due to faulty backend code
exports.handle500s = (err, req, res, next) =>{
    console.log(err);
    res.status(500).send({msg: "Server Error"});
}