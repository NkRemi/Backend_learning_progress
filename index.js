import express from 'express'
import tasks from './tasks.js';
import router from './routes/taskRoutes.js';

const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/taskapi",router);


app.get("/",(req,res)=>{
    res.status(200).json({
        message: "You've Reached the Task Manager API Successfully!!!"
    })
})


app.listen(PORT, (req,res)=>{
    console.log(`Server is listening at port ${PORT}`)
})