import express from 'express'

const app = express();

function errorHandler(err,req,res,next){
    // console.error(err.stack);
    res.status(err.status).json({
        "Error Message" : err.message
    })
}

export default errorHandler;