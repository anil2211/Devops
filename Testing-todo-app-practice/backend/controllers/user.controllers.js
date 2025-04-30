const UserModel=require("../models/user.model")

const getAllUsers= async(req,res)=>{
    try {
        const users = await UserModel.find();
        res.status(200).json({ message: "Users retrieved", response: users });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const createUser=async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        const newuser = new UserModel({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User created", newUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to create new user" });
    }
}


const deleteUser=(req,res)=>{

}


const updateUser=(req,res)=>{

}


module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
};
