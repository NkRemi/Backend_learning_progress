import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv/config';
import db from "./db.js";

const app = express();
const port = process.env.PORT

app.use(express.json()); // parsing incoming json data
app.use(express.static("public"));


await db.connect();
app.get("/health",async (req,res)=>{
    const status = await db.query('select 1');
    if(!status){
      const err = `Could not Reach DB`;
      err.status = 500;
      throw err
    }
    res.status(200).json({
      message: "DB running"
    });
})

app.get("/", async (req, res) => {
  
  const items = await db.query("select * from items ORDER BY id ASC");

  if(!items){
    throw err
  }
res.json(items.rows)
});
 
app.post("/add", async (req, res) => {
  const {title} = req.body;  //destrcture by the key properties that you have
  try{
     await db.query(`insert into items (title) values($1)`,[title]);
    res.redirect("/");
  } catch(err){
      console.error(err);
  }});

app.post("/edit/:id", async (req, res,next) => {

  const taskId = req.params.id;
  const {title} = req.body;
  try{
    const result = await db.query('update items set title = $1 where id = $2 returning *',[title,taskId]);
    if(result.rows.length === 0){
      const err = new Error(`Failed to Update Task`);
      err.status = 500
      throw err
    }
    res.status(200).json({
      message: "Task Updated Successfully!"
    })
  } catch(err){
      next(err)
  }
});

app.post("/delete/:id", async (req, res,next) => {
  const taskId = req.params.id;
  try{
    const result = await db.query(`delete from items where id = $1 returning *`,[taskId]);
    if(result.rows.length === 0){
      const err = new Error(`Failed to Delete Task!`);
      err.status = 500;
      throw err;
    }
    res.status(200).json({
      message: "Task Deleted Successfully"
    })
  } catch(err){
    console.error(err);
    next(err);
  }
  
});
//handle 404's
app.use((req,res,next)=>{
    const err = new Error(`Requested Response Not Found`);
    err.status = 404
    next(err)
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
      message: err.message
    })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
