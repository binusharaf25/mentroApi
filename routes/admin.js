import express from 'express'
const adminDash=express.Router()
import {protect} from '../middleweres/auth.js'
import { authorization } from '../middleweres/authorization.js';
//Admin Dashboard 
adminDash.get('/dashboard',protect,authorization('admin'),(req,res)=>{
    res.json(`Welcom to admin dashboard ${req.user.username} - ${req.user.role}`)
})

export default adminDash;