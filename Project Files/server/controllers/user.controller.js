import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

async function controlUser(req, res){
	try {
		const {username, email, password, role} = req.body
		const salt = await bcrypt.genSalt()
		const hashed_password = await bcrypt.hash(password, salt)
		await User.create({username, email, password: hashed_password, role})
		res.send("User created Successfully.")
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: "Failed to retrieve users" });
	}
}

async function getUser(req, res) {
	try {
		const users = await User.find()
		return res.status(200).json({users})
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: "Failed to retrieve users" })
	}
}

async function loginUser(req, res){
	try {
		const {username, password} = req.body
		const user = await User.findOne({username})
		console.log(user)
		if(!user){
			return res.status(404).json({message: "User not Found"})
		}
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch){
			return res.status(401).json({message: "Incorrect Password"})
		}
		const payload = {userid: user._id, role: user.role}
		const secretkey = process.env.JWT_secret_key
		if (!secretkey) {
        console.error("JWT Secret Key is missing in .env file!");
        return res.status(500).json({ message: "Internal configuration error" });
    }
		const token = jwt.sign(payload, secretkey, { expiresIn: '1h' })
		return res.status(200).json({token, message: "User Login Successful", role: user.role})
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: "Server error during login" })
	}
}

export { controlUser, getUser, loginUser }