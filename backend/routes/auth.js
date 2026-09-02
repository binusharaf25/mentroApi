import express from "express";
import { login, registerUser } from "../controllers/auth.js";
import { protect } from "../middleweres/auth.js";
import { validateZod } from "../middleweres/validateZod.js";
import { createUserSchema } from "../schema/userSchema.js";
const authRoutes = express.Router();

authRoutes.post("/register", validateZod(createUserSchema),registerUser);
authRoutes.post("/login", login);

//procted
authRoutes.get("/profile",protect,(req, res) => {
  res.json(req.user)
  res.json(`Welecome to protected `);
});





export default authRoutes;
