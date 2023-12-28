import express from "express";
import { deleteUser, getUser, loginUser, logoutUser, registerUser, updateAccessToken } from "../controller/user.controller";
import { isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/create-user", registerUser);
userRouter.post('/login', loginUser);

userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAuthenticated, getUser);
userRouter.get('/logout', isAuthenticated, logoutUser);

userRouter.delete('/delete-user/:id', isAuthenticated, deleteUser);

export default userRouter;



