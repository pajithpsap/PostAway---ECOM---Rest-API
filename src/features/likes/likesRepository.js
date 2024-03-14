import mongoose from "mongoose";
import { LikesSchema } from "./likesSchema.js";
import { PostSchema } from "../posts/postSchema.js";
import { CommentsSchema } from "../comments/commentsSchema.js";
const PostModel = mongoose.model("Posts", PostSchema);
const LikesModel = mongoose.model("Likes", LikesSchema);
const CommentModel = mongoose.model("Comments", CommentsSchema);

export default class LikesRepository {
  async addLikePost(likeData) {
    const { id, userID } = likeData;

    const findlike = await LikesModel.findOne({
      postID: new mongoose.Types.ObjectId(id),
      userID: new mongoose.Types.ObjectId(userID),
    });
    if (findlike) {
      return null;
    }

    const like = new LikesModel({
      likes: 1,
      userID: userID,
      postID: id,
    });
    await like.save();
    await PostModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      {
        $inc: {
          likes: 1,
        },
      }
    );

    return like;
  }

  async addLikeCommnet(commentData) {
    const { id, userID } = commentData;
    const like = new LikesModel({
      likes: 1,
      userID: userID,
      commentID: id,
    });
    const comment = await CommentModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      {
        $inc: {
          likes: 1,
        },
      }
    );
    await comment.save();
    return like;
  }

  async toggleLikePost(id, userID) {
    const like = await LikesModel.findOne({
      postID: new mongoose.Types.ObjectId(id),
      userID: new mongoose.Types.ObjectId(userID),
    });
    console.log(userID);
    if (like) {
      const post = await PostModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(id),
        },
        {
          $inc: {
            likes: -1,
          },
        }
      );
      await post.save();
      const deletedLike = await LikesModel.findOneAndDelete({
        postID: new mongoose.Types.ObjectId(id),
        userID: new mongoose.Types.ObjectId(userID),
      });
    } else {
      const addedlike = new LikesModel({
        likes: 1,
        userID: userID,
        postID: id,
      });
      await addedlike.save();
      const addedpost = await PostModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(id),
        },
        {
          $inc: {
            likes: 1,
          },
        }
      );
      await addedpost.save();
    }
  }

  async toggleLikeComment(id, userID) {
    const like = await LikesModel.findOne({
      commentID: new mongoose.Types.ObjectId(id),
      userID: new mongoose.Types.ObjectId(userID),
    });
    if (like) {
      const post = await CommentModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(id),
        },
        {
          $inc: {
            likes: -1,
          },
        }
      );
      await post.save();
      const deletedLike = await LikesModel.findOneAndDelete({
        commentID: new mongoose.Types.ObjectId(id),
        userID: new mongoose.Types.ObjectId(userID),
      });
    } else {
      const addedlike = new LikesModel({
        likes: 1,
        userID: userID,
        commentID: id,
      });
      await addedlike.save();
      const addedpost = await CommentModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(id),
        },
        {
          $inc: {
            likes: 1,
          },
        }
      );
      await addedpost.save();
    }
  }
}
