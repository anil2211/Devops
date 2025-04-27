const Todo =require("../models/todoModels")
const logger = require("../utils/loggers")

exports.getTodos= async (req,res)=>{
    console.log("Fetching the todos from the DBs")
    try {
        const todos= await Todo.find();
        // log.debug()
        logger.info("fetched all the todos",todos)
        // console.log("fetched all the todos",todos)
        res.status(200).json(todos)
    } catch (error) {
        logger.error("Error while fetching the todos",error)
        res.status(500).json({message:"something went wrong..."})
    }
}

exports.addTodo = async(req,res)=>{
    try {
        
    const title=req.body;
    // console.log("Adding a new todo",req.body)
    logger.info("adding a new todo",title.todo)
    const newTodo = new Todo({
        title:title.todo
    })
    logger.info("Adding the todo to DB",newTodo)
    const savedTodo = await newTodo.save()
    logger.info("Added the todo to Db",savedTodo)

    res.status(200).json(savedTodo)
    } catch (error) {
        logger.error("Error while adding  the todos",error)
        res.status(500).json({message:"something went wrong..."})
    }
    
}