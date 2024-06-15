import express from "express";
import { addcomment, deletecomment, getcomments } from '../controllers/comment.js';
import { verifyToken } from "../verifyToken.js";

const router=express.Router();

//add comment to the videos
router.post("/addcomment",verifyToken,addcomment)

//delete comment of the video
router.delete("/deletecomment/:id",verifyToken,deletecomment)


//get all the comment of the video
router.get("/getcomment/:videoId",getcomments)

export default router;