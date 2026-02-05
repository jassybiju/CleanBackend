import { model, Schema } from "mongoose";

const postSchema = new Schema({
    _id : {type : String, required : true, },
    title : {type : String, required : true},
    content : {type : String, required : true},
    authorId : {type : String, required : true}
},{
    timestamps : true
})

export const postModel = model('Post', postSchema)