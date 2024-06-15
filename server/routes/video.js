import express from "express";
import { addvideo, addview, deletevideo, getvideo, randomvideo, subscribedvideo, trendvideo, updatevideo, videobytags, videobytitles } from '../controllers/video.js';
import { verifyToken } from "../verifyToken.js";

const router=express.Router();

//create video 
router.post("/addvideo",verifyToken,addvideo)

//update video
router.put("/updatevideo/:id",verifyToken,updatevideo)

//delete video
router.delete("/deletevideo/:id",verifyToken,deletevideo)

//get video
router.get("/getvideo/:id",getvideo)

//add view in video
router.get("/addview/:id",addview)

//trending videos
router.get("/trending",trendvideo)

//random videos
router.get("/random",randomvideo)

//subscribed videos
router.get("/subscribed",verifyToken,subscribedvideo)

//video by tags
router.get("/tags",videobytags)

//video by search title
router.get("/search",videobytitles)

export default router;