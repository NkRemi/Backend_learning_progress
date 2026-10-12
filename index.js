import express from 'express'
const app = express();
PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "home page"
    })
})
app.listen(PORT, (req,res)=>{
    console.log(`Server is listening at port ${PORT}`)
})