import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema= new mongoose.Schema({
    username:String,
    email:{type:String,unique:true},
    password:String
})


const User=mongoose.model('User',userSchema)
export default User;