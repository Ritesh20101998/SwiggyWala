const express = require('express');
const userController = require("../controllers/user.controller")

//Middlewares
const authMiddleware = require("../middleware/auth.middleware")
const { validateSignup, validateLogin, validate } = require("../middleware/validation.middleware")

const userRouter = express.Router()

// welcome
userRouter.get("/", (req,res)=>{
    res.send({"message" : "Start api successfully.."})
})

//Signup Route
userRouter.post("/signup", validateSignup, validate, userController.signup);

//Login Route
userRouter.post("/login", validateLogin, validate, userController.login);

//Logout Route
userRouter.get("/logout", authMiddleware.authenticateToken, userController.logout);

module.exports = userRouter;