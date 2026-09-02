import User from "../models/auth.js";
import { generateToken } from "../utils/generateToken.js";

// REGISTER NEW USER

export const registerUser = async (req, res, next) => {

    let { name, password, email, role } = req.body;

    try {
        email = email.toLowerCase();
        const exists = await User.findOne({ email });

        if (exists) return res.status(400).json({ message: 'Email already in use' });

        const user = await User.create({ name, password, email, role });
       

        const token = generateToken(user._id)

        res.status(201).json({ message: "User registered successfully" })

    } catch (err) {
       
        next(err)
    }
}

export const login = async (req, res, next) => {

    let { email, password } = req.body;

    try {

        email = email.toLowerCase();

        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = generateToken(user._id);


        res.json({ token,user})

    } catch (err) {
        next(err)
    }
}