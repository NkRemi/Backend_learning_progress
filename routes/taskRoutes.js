import express from 'express'
import tasks from '../tasks.js';

const router = express.Router();

//return a list of tasks
router.get("/tasks",(req,res)=>{
    res.status(200).json(tasks);
})

//endpoint to find a task by id
router.get("/tasks/:id",(req,res)=>{
    let taskId = Number(req.params.id);//id from param is string, id in array is Number. make the types same.
    try{
        let isFound = tasks.some((task)=>task.id === taskId);
        if(!isFound) throw new Error(`Could not find Item with id ${taskId}`);
        let task = tasks.find((item)=>item.id === taskId);
        res.status(200).json(task)
    } catch(error){
        res.status(404).json({
            message: `Task with id ${taskId} not Found`
        })
    }
})
//endpoint to create a task
router.post("/tasks/create",(req,res)=>{
    const {id,name,description,setDate,deadline} = req.body;
    tasks.push({
        id,name,description,setDate,deadline
    });

    res.status(201).json({
        message: `new Task Created.`
    })
})
//endpoint to update a task
router.put("/tasks/:id",(req,res,next)=>{
   let taskId = Number(req.params.id);
    
   let task = tasks.find((task)=>task.id ===taskId);
    if(!task) {
        let error = new Error(`Task does not Exist.`);
        error.status = 404;
        return next(error);
    }
    
    let newTask = {
        id: req.body.id || task.id,
        name:req.body.name || task.name,
        description:req.body.description || task.description,
        setDate:req.body.setDate || task.setDate,
        deadline:req.body.deadline || task.deadline
    }
    res.status(201).json(newTask);
})

//Delete a task




export default router;
