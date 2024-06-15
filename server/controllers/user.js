import User from "../models/User.js"
import Video from "../models/Video.js";
import {selferror }from "../error.js"

export const updateuser = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },
            {new:true}
            )
            res.status(200).json(updatedUser)
        } catch (err) {
            next(err)
        }
    }else{
        return next(selferror(403, "You're not authenticated to update this account"))
    }
}

export const deleteuser =async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("account deleted successfully")
        } catch (err) {
            next(err)
        }
    }else{
        return next(selferror(403, "You're not authenticated to update this account"))
    }
}

export const getuser = async (req,res,next)=>{
        try {
            const user=await User.findById(req.params.id)
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
}


export const follow = async (req,res,next)=>{
    try{
        // const user = await User.findById(req.params.id)
        // const currentUser = await User.findById(req.body.id)

        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.params.id},
        })

        await User.findByIdAndUpdate(req.params.id,{
            $inc:{
                subscribers:1
            },
        })
        res.status(200).json("Subscribed successfully")

    }catch(err){
        next(err)
    }
}

export const unfollow = async (req,res,next)=>{
    try{
        // const user = await User.findById(req.params.id)
        // const currentUser = await User.findById(req.body.id)

        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers:req.params.id},
        })

        await User.findByIdAndUpdate(req.params.id,{
            $inc:{
                subscribers:-1
            },
        })
        res.status(200).json("Unsubscribed successfully")

    }catch(err){
        next(err)
    }
}

export const like = async (req,res,next)=>{
    const id=req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        },{new:true})
        res.status(200).json("Video liked successfully")
    } catch (err) {
        next(err)
    }
}

export const dislike = async (req,res,next)=>{
    const id=req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        },{new:true})
        res.status(200).json("Video disliked successfully")
    } catch (err) {
        next(err)
    }
}