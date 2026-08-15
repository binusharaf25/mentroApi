import express from 'express'
import { getUser,createUser, updateUser, deleteUser, singleUser, registerUser } from '../controllers/user.js';
const router=express.Router();

router.get('/',getUser);
router.get('/:id',singleUser);
router.post('/',createUser)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)


// real live user creation
router.post('/register',registerUser)

export default router