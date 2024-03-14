import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  caption: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
    },
  ],
  likes: {
    type: Number,
  }
});
