import express from 'express'
import tasks from '../tasks.js';

const router = express.Router();

//return a list of tasks
router.get("/tasks",(req,res)=>{
    res.status(200).json(tasks);
})

//endpoint to find a task by id
router.get("/tasks/:id",(req,res)=>{
    let taskId = Number(req.params.id);
    
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

//Delete a task

export default router;
