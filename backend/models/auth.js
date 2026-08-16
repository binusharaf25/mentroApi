import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema= new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    role:{
        type:String,
        enam:["user","admin"],
        default:"user"
    }
})

// Hash password before saving
userSchema.pre('save',async function(){

    //original password before updating
    if(!this.isModified) return;

    //generating Hash password
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
    
})

//compare password method
userSchema.methods.comparePassword = function(inputPassword){
    return bcrypt.compare(inputPassword,this.password)
}


const Auth=mongoose.model('Auth',userSchema)
export default Auth;