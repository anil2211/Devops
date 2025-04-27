const Todo =require("../models/todoModels")


exports.getTodos= async (req,res)=>{
    console.log("Fetching the todos from the DBs")
    try {
        const todos= await Todo.find();
        console.log("fetched all the todos",todos)
        res.status(200).json(todos)
    } catch (error) {
        console.log("Error while fetching the todos",error)
        res.status(500).json({message:"something went wrong..."})
    }
}

exports.addTodo = async(req,res)=>{
    const title=req.body;
    // console.log("Adding a new todo",req.body)
    console.log("adding a new todo",title.todo)
    const newTodo = new Todo({
        title:title.todo
    })
    console.log("Adding the todo to DB",newTodo)
    const savedTodo = await newTodo.save()
    console.log("Added the todo to Db",savedTodo)

    res.status(200).json(savedTodo)
}