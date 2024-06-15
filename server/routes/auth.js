import express from "express";
import { register, signin } from '../controllers/auth.js';

const router=express.Router();

//CREATE A USER
router.post("/register",register)

//SIGN IN
router.post("/signin",signin)

//GOOGLE AUTH
router.post("/auth",)

export default router;