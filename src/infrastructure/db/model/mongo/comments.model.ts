import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    _id : { type : String,  required : true},
    comment : {type : String, required : true},
    user_id : {type : String, required : true},
    post_id : {type : String, required : true},
},{timestamps : true})

export const commentModel = mongoose.model('Comment',commentSchema)