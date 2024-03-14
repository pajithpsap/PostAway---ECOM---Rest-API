// Manage routes/paths to ProductController

// 1. Import express.
import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

// 2. Initialize Express router.
const userRouter = express.Router();

const userController = new UserController();

// All the paths to controller methods.

userRouter.post("/signup", (req, res, next) => {
  userController.signUp(req, res, next);
});
userRouter.post("/signin", (req, res) => {
  userController.signIn(req, res);
});
userRouter.get("/signout", (req, res) => {
  userController.signOut(req, res);
});
userRouter.put("/resetPassword", jwtAuth, (req, res) => {
  userController.resetPassword(req, res);
});
userRouter.get("/get-details/:userId", (req, res) => {
  userController.getDetails(req, res);
});
userRouter.get("/get-all-details", (req, res) => {
  userController.getAllDetails(req, res);
});
userRouter.put("/update-details/:userId", jwtAuth, (req, res) => {
  userController.updateDetails(req, res);
});

export default userRouter;
