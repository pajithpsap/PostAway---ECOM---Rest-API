import mongoose from "mongoose";

export const LikesSchema = new mongoose.Schema({
    likes: {
        type: Number,
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    postID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
    },
    commentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
    }
});