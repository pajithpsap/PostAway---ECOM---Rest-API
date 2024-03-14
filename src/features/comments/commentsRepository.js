import mongoose from "mongoose";
import { CommentsSchema } from "./commentsSchema.js";
import { PostSchema } from "../posts/postSchema.js";
const CommentModel = mongoose.model("Comments", CommentsSchema);
const PostModel = mongoose.model("Posts", PostSchema);

export default class CommentRepository {
  async addComment(commentData) {
    const { userID, postID, content } = commentData;
    const newComment = new CommentModel({
      content: content,
      userID: userID,
      postID: postID,
    });
    await newComment.save();
    const post = await PostModel.findById(postID);
    post.comments.push(newComment._id);
    await post.save();
    return newComment;
  }

  async getComments(postData) {
    const { userID, postID } = postData;
    const allComments = await CommentModel.find({
      postID: new mongoose.Types.ObjectId(postID),
      userID: new mongoose.Types.ObjectId(userID),
    });
    return allComments;
  }

  async deleteComment(commentData) {
    const { userID, commentID } = commentData;
    const comment = await CommentModel.findById(commentID);
    const postID = comment.postID;
    await CommentModel.deleteOne({
      _id: new mongoose.Types.ObjectId(commentID),
      userID: new mongoose.Types.ObjectId(userID),
    });
    await PostModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(postID),
      },
      {
        $pull: {
          comments: new mongoose.Types.ObjectId(commentID),
        },
      },
      {
        new: true
      }
    );
    await deleteinPost.save();
  }

  async updateComment(commentData) {
    const { userID, commentID, content } = commentData;
    const updatedComment = await CommentModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(commentID),
        userID: new mongoose.Types.ObjectId(userID),
      },
      {
        content: content,
      }
    );
    await updatedComment.save();
    return updatedComment;
  }
}
