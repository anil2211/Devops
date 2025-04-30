const express=require("express");
const router = express.Router();
const Todo =require("../models/todo")


//create a new todo 
router.post("/todos",async(req,res)=>{
    try {
        const {taskName}=req.body;
        const todo=new Todo({taskName});
        const resp=await todo.save();
        res.status(201).json(resp)
    } catch (error) {
        res.status(500).json({Message:"Error while creating todo",error})
    }
})



// get all todos
//Get All Todos
router.get('/todos', async (req,res) => {
    try {
        const todos = await Todo.find();
        console.log(todos);
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error while fetching Todo", error })
    }
})

//Update Todo By Id
router.put('/todos/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const updateTodo= await Todo.findByIdAndUpdate(id,{status:true},{new:true})
        res.status(200).json(updateTodo);
    } catch (error) {
        res.status(500).json({ message: "Error while updating Todo", error })
    }
})

//Delete Todo By Id
router.delete('/todos/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        await Todo.findByIdAndDelete(id)
        res.status(200).json({message:"Todo deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: "Error while deleting Todo", error })
    }
})





module.exports=router;