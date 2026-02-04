import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id : {type : String, unique : true, required : true},
    name : {type : String, required : true},
    email : {type : String, unique : true , required : true},
    password : {type : String, unique : true, required : true}
},{
    timestamps : true
})

export const UserModel = mongoose.model('User', userSchema)