import express from "express";
import LikesController from "./likesController.js";

const likesRouter = express.Router();
const likesController = new LikesController();
likesRouter.post("/:id", (req, res) => {
  likesController.addLike(req, res)
});

likesRouter.put("/toggle/:id", (req, res) => {
  likesController.toggleLike(req, res)
});

export default likesRouter;
