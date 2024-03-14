import CommentRepository from "./commentsRepository.js";

export default class CommentController {
  constructor() {
    this.commentRepo = new CommentRepository();
  }

  async addComment(req, res) {
    try {
      const postID = req.params.postId;
      const content = req.body.content;
      const userID = req.userID;
      const addedComment = await this.commentRepo.addComment({
        userID,
        postID,
        content,
      });
      if (addedComment) {
        return res.status(201).send(addedComment);
      } else {
        return res.status(400).send("Incorrect Details - addComment");
      }
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  }

  async getComments(req, res) {
    try {
      const postID = req.params.postId;
      const userID = req.userID;
      const allComments = await this.commentRepo.getComments({
        postID,
        userID,
      });
      if (allComments) {
        return res.status(201).send(allComments);
      } else {
        return res.status(400).send("Incorrect Details - allComment");
      }
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  }

  async deleteComment(req, res) {
    try {
      const commentID = req.params.commentId;
      const userID = req.userID;
      await this.commentRepo.deleteComment({
        commentID,
        userID,
      });
      return res.status(201).send("Comment Deleted Successfully");
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  async updateComment(req, res) {
    try {
      const commentID = req.params.commentId;
      const userID = req.userID;
      const content = req.body.content;
      const updatedComment = await this.commentRepo.updateComment({
        commentID,
        userID,
        content,
      });
      if (updatedComment) {
        return res.status(201).send(updatedComment);
      } else {
        return res.status(400).send("Incorrect Details - updateComment");
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}
