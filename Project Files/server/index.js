import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'


const app = express()

connectDB()

app.use(express.json())
app.use(cors())

app.listen(5000, () => {
    console.log("Server listening at port 5000")
})