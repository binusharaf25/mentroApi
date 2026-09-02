import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import router from '../backend/routes/user.js'
import authRoutes from '../backend/routes/auth.js'
import adminDash from '../backend/routes/admin.js';
import taskRoutes from '../backend/routes/task.js';

import path from 'path'
import { fileURLToPath } from 'url';

import { loger } from '../backend/middleweres/loger.js';
import { notFound } from '../backend/middleweres/notFound.js';
import { errorHandler } from '../backend/middleweres/errorHandler.js';
import helmet from 'helmet';
import { limiter } from '../backend/middleweres/rateLimiter.js';


//swagger
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../backend/utils/swagger.js';
import cors from "cors";
import morgan from 'morgan';





dotenv.config();

const app=express()
const Port=process.env.PORT || 3000

app.use(cors({
  origin: "*"
}));
if(process.env.MONGO_URI_DEV == 'development'){
  app.use(morgan('dev'))
}
app.use(express.json())



//swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//rate limit
// app.use(limiter)

//swagger


//helmet
app.use(helmet())
//Middlewares
app.use(loger)


//registering all router
app.use('/api/users',router)
app.get('/api/first',(req,res)=>{
    res.send("Hello from node back end")
})
app.use('/api/admin',adminDash)
app.use('/api/tasks',taskRoutes)

//Sever front in production
if(process.env.NODE_ENV==='production'){
  const __dirname=path.dirname(fileURLToPath(import.meta.url))
  app.use(express.static(path.join(__dirname,'../frontend/dist')))

  //server the frontend app
  app.get(/.*/,(req,res)=>{
    res.send(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'))
  })
}

//Sign up and Login
app.use('/api/auth',authRoutes)
//Global middklemare
app.use(notFound)
app.use(errorHandler)




//run server
app.listen(3000,()=>console.log(`Our server runs on port ${Port}`))

//conneting to database
mongoose.connect(process.env.NODE_ENV == 'development'? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
    .then(()=>console.log("✅ connection sucess"))
    .catch((err)=>console.log("❌ connection failed ",err))