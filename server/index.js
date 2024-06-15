import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/video.js";
import commentRoutes from "./routes/comment.js";
import authRoutes from "./routes/auth.js";

const app=express()
dotenv.config()

const connect =() =>{
    mongoose.connect(process.env.MONGO).then(()=>console.log("connected to mongo")).catch((err)=>console.log(err))
}

app.use(cookieParser())

app.use(express.json())
app.use("/api/auths",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentRoutes)

app.use((err,req,res,next)=>{
    const status=err.status || 500;
    const message=err.message || "Something went wrong";
    return res.status(status).json({
        success:false,
        status:status,
        error:message,
    })
})

app.listen(8080,()=>{
    connect()
    console.log("server is running!!")
})