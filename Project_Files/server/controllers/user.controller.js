import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

async function controlUser(req, res){
    try {
        const { username, email, password, type } = req.body;
        if (!username || !email || !password || !type) return res.status(400).json({ message: "All fields required" });

        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        const grantedStatus = type === "Owner" ? "pending" : "granted";

        await User.create({ username, email, password: hashed_password, type, granted: grantedStatus });
        res.status(201).json({ message: "User created Successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to create user." });
    }
}

async function loginUser(req, res){
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: "Username and password required" });

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not Found" });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Incorrect Password" });
        
        if (user.type === "Owner" && user.granted !== "granted") {
            return res.status(403).json({ message: "Account pending admin approval." });
        }

        const secretkey = process.env.JWT_secret_key;
        const token = jwt.sign({ userid: user._id, type: user.type }, secretkey, { expiresIn: '1d' });
        
        return res.status(200).json({ token, message: "Login Successful", type: user.type, username: user.username, userid: user._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error during login" });
    }
}

async function getUser(req, res) {
    try {
        const users = await User.find().select('-password');
        return res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to retrieve users" });
    }
}

export { controlUser, loginUser, getUser };