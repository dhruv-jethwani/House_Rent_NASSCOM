import mongoose from 'mongoose'

async function connectDB(){
	try {
		await mongoose.connect("mongodb+srv://dhruvjethwani56_db_user:0hzEx72ui6A5sGn5@cluster0.dlkvlms.mongodb.net/House_Rent")
	} catch (error) {
		console.log(error)
	}

}

export default connectDB