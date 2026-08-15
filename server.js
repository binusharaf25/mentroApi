import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import router from './routes/user.js';
import authRoutes from './routes/auth.js';
import adminDash from './routes/admin.js';
import taskRoutes from './routes/task.js';


import { loger } from './middleweres/loger.js';
import { notFound } from './middleweres/notFound.js';
import { errorHandler } from './middleweres/errorHandler.js';
import helmet from 'helmet';
import { limiter } from './middleweres/rateLimiter.js';


//swagger
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';






dotenv.config();

const app=express()
const Port=process.env.PORT || 3000



app.use(express.json())



//swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//rate limit
app.use(limiter)

//swagger


//helmet
app.use(helmet())
//Middlewares
app.use(loger)


//registering all router
app.use('/users',router)
app.get('/',(req,res)=>{
    res.send("Hello from node")
})
app.use('/admin',adminDash)
app.use('/tasks',taskRoutes)



//Sign up and Login
app.use('/auth',authRoutes)
//Global middklemare
app.use(notFound)
app.use(errorHandler)




//run server
app.listen(3000,()=>console.log(`Our server runs on port ${Port}`))

//conneting to database
mongoose.connect(process.env.NODE_ENV== 'development'? process.env.MONGO_URI_DEV: process.env.MONGO_URI_PRO)
    .then(()=>console.log("✅ connection sucess"))
    .catch((err)=>console.log("❌ connection failed ",err))