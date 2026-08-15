import express from 'express'
import { allusers, createTask, deleteTask, findUser, updateTask } from '../controllers/task.js'
import { protect } from '../middleweres/auth.js'
const taskRoutes=express.Router()

taskRoutes.post('/create',protect,createTask)
taskRoutes.get('/:id',findUser)
taskRoutes.get('/',protect,allusers)
taskRoutes.put('/:id',protect,updateTask)
taskRoutes.delete('/:id',protect,deleteTask)


export default taskRoutes