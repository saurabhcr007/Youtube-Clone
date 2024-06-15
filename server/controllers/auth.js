import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { selferror } from "../error.js";



export const register = async (req,res,next)=>{
        // console.log(req.body)
    try{
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);
        const newUser=new User({...req.body,password:hash})
        // console.log(newUser);
        await newUser.save();
        res.status(200).send("user has been created")
    }
    catch(err){
        // next(selferror(err.status,err.message))
        // next(selferror(500,"hello"))
        next(err)
    }
}


// export const signin = async (req,res,next)=>{
//     try{
//         const user=await User.findOne({email:req.body.email})
//         console.log(user)
//         if(!user){ 
//         return next(selferror(404,"user not found"))
//         }
//         const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)
        
//         if(!isPasswordCorrect){
//             return next(selferror(400,"wrong password"))
//         }

//         const token=jwt.sign({id:user._id},process.env.JWT)
//         const {password,...others}=user._doc

//         res.cookie("access_token",token,{
//             httpOnly:true,
//         }).status(200).json(others)
//         console.log(res.cookie)
        
//     }
//     catch(err){
//         next(err)
//     }
// }

export const signin = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log(user)
      if (!user) return next(selferror(404, "User not found!"));

      const isCorrect = await bcrypt.compare(req.body.password, user.password);

      if (!isCorrect) return next(selferror(400, "Wrong Credentials!"));

      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { password, ...others } = user._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
        console.log(1)
    } catch (err) {
      next(err);
    }
  };