import Task from "../models/taskSchema.js";

//creating tasks
export const createTask = async (req, res, next) => {
  try {
    const newTask = await Task.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};


// updating task
export const updateTask=async(req,res,next)=>{
   
    try {
        const updated=await Task.findOneAndUpdate({_id:req.params.id,createdBy:req.user._id},req.body,{new:true});
        if(!updated) return res.status(404).json({message: `This id ${req.params.id} not found`});
        res.json(`This id ${req.params.id} updated`)
        
    } catch (error) {
        next(error)
    }
}

//delete Task
export const deleteTask=async(req,res,next)=>{
    
    try {
        const delTask=await Task.findOneAndDelete({_id:req.params.id,createdBy:req.user._id})
        if(!delTask) return res.status(404).json({message: `This id ${req.params.id} not found `});
        res.json(`This id ${req.params.id} sucesful deleted`)
    } catch (error) {
        next(error)
    }
}

//Finding users

export const findUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getUser = await Task.findById(id);
    if (!getUser)
      return res.status(401).json({ message: `this id ${id} not found` });
    res.json(getUser);
  } catch (error) {
    next(error);
  }
};
//Find Alll users
export const allusers=async(req,res,next)=>{
    const {id}=req.params;
    try {
        const userInfo=await Task.find({createdBy:req.user._id})
        res.json(userInfo)
    } catch (error) {
        next(error)
    }
}
