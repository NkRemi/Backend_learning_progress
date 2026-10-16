import express from 'express'

const app = express();
//handling the 404
const handle404 = (req,res,next)=>{
    res.status(404).send(
        "Sorry, That route does not Exists.");
}

function errorHandler(err,req,res,next){
    // console.error(err.stack);
    let errStatusCode = err.status || 500;
    res.status(errStatusCode).json({
        "Error Message" : err.message || "Internal Server Error"
    })
}

export  {errorHandler,handle404};