import { selferror } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addvideo = async(req, res, next)=>{
    const newVideo=new Video(
        {
            userId:req.user.id,...req.body
        }
    );
    try {
        const saveVideo = await newVideo.save()
        res.status(200).json(saveVideo)
    } catch (err) {
        next(err)
    }
}

export const updatevideo = async (req, res, next) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) return next(selferror(404, "Video not found!"));
      if (req.user.id === video.userId) {
        const updatedVideo = await Video.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedVideo);
      } else {
        return next(selferror(403, "You Can't update this video"));
      }
    } catch (err) {
      next(err);
    }
  };

export const deletevideo = async(req, res, next)=>{

    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(selferror(404, "Video not found!"));
        if (req.user.id === video.userId) {
          await Video.findByIdAndDelete(
            req.params.id
          );
          res.status(200).json("Video deleted successfully");
        } else {
          return next(selferror(403, "You Can't delete this video"));
        }
      } catch (err) {
        next(err);
      }
    
}

export const getvideo = async(req, res, next)=>{
    try {
        const video= await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (err) {
        next(err)
    }
    
}

export const addview = async(req, res, next)=>{
    try {
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        res.status(200).json("view added")
    } catch (err) {
        next(err)
    }
    
}

export const randomvideo = async(req, res, next)=>{
    try {
        const videos = await Video.aggregate([{$sample:{size:40}}])
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
    
}

export const trendvideo = async(req, res, next)=>{
    try {
        const videos = await Video.findById().sort({views:-1})
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
    
}

export const subscribedvideo = async(req, res, next)=>{
    try {
        const user = await User.findById(req.user.id)
        const subUser=user.subscribedUsers
        const list = await Promise.all(
            subUser.map( async (Id)=>{
                return await Video.find({userId:Id})
            })
    //     const subscribedChannels = user.subscribedUsers;

    //     const list = await Promise.all(
    //         subscribedChannels.map(async (channelId) => {
    //         return await Video.find({ userId: channelId });
    //   })
        );
        res.status(200).json(list.flat().sort((a,b)=>b.createdAt-a.createdAt))
    } catch (err) {
        next(err)
    }
    
}

export const videobytags = async(req, res, next)=>{
    const tags=req.query.tags.split(",")
    console.log(tags)
    try {
        const videos = await Video.find({tags:{$in:tags}}).limit(20);
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
    
}

export const videobytitles = async(req, res, next)=>{
    const title=req.query.title;
    try {
        const videos = await Video.find({title:{$regex:title,$options:"i"}}).limit(30)
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
    
}