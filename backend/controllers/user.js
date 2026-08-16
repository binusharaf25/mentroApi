import User from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";

//all Users
export const getUser = async (req, res) => {
  const allUser = await User.find();
  res.json(allUser);
};

//single user
export const singleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) return res.status(404).send(`This user_id ${id} not found`);
  res.json(user);
};

//creating new user
export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.json("sever eroor ", error);
  }
};

//updating user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) return res.status(404).send(`This id ${id} not founf`);
    res.send(`This User_id ${id} sucessful updated`);
  } catch (error) {
    res.json("sever error ", error);
  }
};

//deleting the user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const detUser = await User.findByIdAndDelete(id);
    if (!detUser) return res.status(404).send(`This user_id ${id} deleted`);
  } catch (error) {
    res.json(`Sever error ${error}`);
  }
};

//registering
export const registerUser = async (req, res, next) => {
  let { username, email, password } = req.body;
  try {
    email = email.toLowerCase();
    const existEmail = await User.findOne({ email });
    if (existEmail)
      return res.status(404).json({ message: "This email already in use" });
    const createUser = await User.create({ username, email, password });
    const token = generateToken(createUser._id);
    res.status(201).json({ token });
  } catch (err) {
    next(err)
  }
};
