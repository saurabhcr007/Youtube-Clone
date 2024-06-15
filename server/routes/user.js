import express from "express";
import { deleteuser, dislike, follow, getuser, like, unfollow, updateuser } from '../controllers/user.js';
import { verifyToken } from "../verifyToken.js";

const router=express.Router();

//update user
router.put("/update/:id",verifyToken,updateuser)

//delete user
router.delete("/delete/:id",verifyToken,deleteuser)

//get a user
router.get("/find/:id",getuser)

//follow a user
//:id :- id of the user whom you follow
router.put("/follow/:id",verifyToken,follow)

//unfollow a user
//:id :- id of the user whom you unfollow
router.put("/unfollow/:id",verifyToken,unfollow)

//like a video
router.put("/like/:videoId",verifyToken,like)

//dislike a video
router.put("/dislike/:videoId",verifyToken,dislike)

export default router;