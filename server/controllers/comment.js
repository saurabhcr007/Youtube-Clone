import { selferror } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";
import Comment from "../models/Comment.js";

export const addcomment= async(req,res,next)=>{
    // const newcomment=new Comment({
    //     userID:req.user.id,
    //     videoID: req.params.videoId, 
    //     ...req.body
    // })
    const newcomment=new Comment({
            userId:req.user.id, 
        ...req.body
    })
    try{
        const savecomment=await newcomment.save()
        res.status(200).json(savecomment)
    }
    catch(err){
        next(err)
    }
}

export const deletecomment= async(req,res,next)=>{
    try{
        const comment=Comment.findById(req.params.id)
        const video=Video.findById(req.params.id)
        if(req.user.id === comment.userId || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("comment deleted successfully")
        }
        else{
            next(selferror(403, "You can delete only your comment"))
        }
    }
    catch(err){
        next(err)
    }
}

export const getcomments= async(req,res,next)=>{
    try{
        const comments = await Comment.find({videoId: req.params.videoId})
        res.status(200).json(comments)

    }
    catch(err){
        next(err)
    }
}

export const updatecomment= async(req,res,next)=>{
    try{

    }
    catch(err){
        next(err)
    }
}