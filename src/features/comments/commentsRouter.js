import express from "express";
import CommentController from "./commentsController.js";
const commentsRouter = express.Router();

const commentController = new CommentController();
commentsRouter.post('/:postId', (req,res)=>{
    commentController.addComment(req,res)
});
commentsRouter.get('/:postId', (req,res)=>{
    commentController.getComments(req,res)
});
commentsRouter.delete('/:commentId', (req,res)=>{
    commentController.deleteComment(req,res)
});
commentsRouter.put('/:commentId', (req,res)=>{
    commentController.updateComment(req,res)
});

export default commentsRouter;