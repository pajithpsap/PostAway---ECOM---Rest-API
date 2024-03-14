import mongoose from "mongoose";

export const CommentsSchema = new mongoose.Schema({
    content:{
        type:String
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    postID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
    },
    likes:{
        type: Number,
    }
});