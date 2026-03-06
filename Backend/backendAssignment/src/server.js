import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { registerUser } from "./controllers/authController.js"
dotenv.config()

const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.use("api/auth",registerUser)

app.listen(process.env.PORT || 4000,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})