const express = require("express");
const UserControllers = require("../controllers/user.controllers");
const {getAllUsers,createUser,deleteUser,updateUser} = require("../controllers/user.controllers");
const router = express.Router();

router.get("/",getAllUsers)
router.post("/",createUser)
router.delete("/:id",deleteUser)
router.put("/:id",updateUser)


module.exports = router