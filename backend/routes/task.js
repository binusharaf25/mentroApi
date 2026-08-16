import express from 'express'
import {  deleteTask, findUser, updateTask,createTask } from '../controllers/task.js'
import { protect } from '../middleweres/auth.js'
import { getMyTasks } from '../controllers/task.js'
const taskRoutes=express.Router()

taskRoutes.post('/create',protect,createTask)
taskRoutes.get('/:id',protect,findUser)
taskRoutes.get('/',protect,getMyTasks)
taskRoutes.put('/:id',protect,updateTask)
taskRoutes.delete('/:id',protect,deleteTask)


export default taskRoutes