import express from 'express'

const app = express();
PORT = process.env.PORT || 5000;

app.listen(PORT, (req,res)=>{
    console.log(`Server is listening at port ${PORT}`)
})