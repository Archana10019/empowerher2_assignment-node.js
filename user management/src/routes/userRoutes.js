import express from "express";
import { supabase } from "../config/supabase.js";
import { Signup } from "../controllers/userController.js";

const router=express.Router();
router.post("/signup",Signup);
export default router;