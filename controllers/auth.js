import Auth from "../models/auth.js"
import { generateToken } from "../utils/generateToken.js";

//register
export const registerUser= async(req,res,next)=>{
    let {username,email,password,role}=req.body;
    try {
        email=email.toLowerCase();
        const existEmail= await Auth.findOne({email});
        if(existEmail) return res.status(409).json({message:'This email already in use '});
        const NewUser= await Auth.create({username,email,password,role})
        const token =generateToken(NewUser._id);
        res.status(201).json({token})
        
    } catch (error) {
        next(error)
    }
}

//Login
export const login=async(req,res,next)=>{
    let {email,password}=req.body;
    try {
        const exsistEmail= await Auth.findOne({email});
        if(!exsistEmail || !(await exsistEmail.comparePassword(password)) ) return res.status(401).json({message: "Invalid email or password"});
        const token=generateToken(exsistEmail._id);
        res.json({token})
        
    } catch (error) {
        next(error)
    }
}