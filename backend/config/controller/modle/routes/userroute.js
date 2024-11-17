import express from "express"
import { loginUser,registerUser,makeAdmin } from "../controller/userController.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/make-admin", makeAdmin);

export default userRouter;