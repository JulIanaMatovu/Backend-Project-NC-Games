//middleware functions that handle errors

exports.handlesInvalidPath = (req, res) =>{
    res.status(404).send({msg: "Invalid Path"});
};

exports.handleCustomErrors = (err, req, res, next) =>{
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg});
        
    }
    next(err);
}

//handles any errors that may arise due to faulty backend code
exports.handle500s = (err, req, res, next) =>{
    console.log(err);
    res.status(500).send({msg: "Server Error"});
}