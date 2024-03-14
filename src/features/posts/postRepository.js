import mongoose from "mongoose";
import { PostSchema } from "./postSchema.js";
import { CommentsSchema } from "../comments/commentsSchema.js";

const PostModel = mongoose.model("Posts", PostSchema);
const CommentModel = mongoose.model("Comments", CommentsSchema);
export default class PostRepository {
  async addPost(postData) {
    try {
      const { caption, fileName, userID } = postData;
      const newPost = new PostModel({
        userID: userID,
        caption: caption,
        imageUrl: fileName,
      });
      await newPost.save();
      return newPost;
    } catch (err) {
      console.log(err);
    }
  }

  async getOnePost(postID) {
    try {
      const post = await PostModel.findById(postID).populate(
        "comments",
        "content"
      );
      return post;
    } catch (err) {
      console.log(err);
    }
  }
  async getPosts(userID) {
    try {
      const posts = await PostModel.find({ userID: userID }).populate(
        "comments",
        "content"
      );
      return posts;
    } catch (err) {
      console.log(err);
    }
  }
  async getPostsAll() {
    try {
      const posts = await PostModel.find({});
      return posts;
    } catch (err) {
      console.log(err);
    }
  }
  async deletePost(postID, userID) {
    try {
      const deletedPost = await PostModel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(postID),
        userID: new mongoose.Types.ObjectId(userID),
      });
      return deletedPost;
    } catch (err) {
      console.log(err);
    }
  }
  async updatePost(updateData) {
    try {
      const { postID, userID, caption, filename } = updateData;
      const updatedPost = await PostModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(postID),
          userID: new mongoose.Types.ObjectId(userID),
        },
        {
          caption: caption,
          imageUrl: filename,
        }
      );
      await updatedPost.save();
      return updatedPost;
    } catch (err) {
      console.log(err);
    }
  }
}
