import { supabase } from "../config/supabase.js";
import {validateSignup}from "../validation/user.validation.js";


export const Signup=async(req,res) =>{

    

    const error=validateSignup(req.body);
    if(error){
        return res.status(400).json({error});
    }


    const {name,email,password}=req.body;
    const{data:existingUser}=await supabase 
    .from("userss")
    .select("*")
    .eq("email",email)
    .single();
    if(existingUser){
        return res.status(400).json({error:"email  already exists"});
    }

    //inserting user
    const{data,error:insertError}=await supabase
    .from("userss")
    .insert([{name,email,password}])
    .select()

    if(insertError){
        return res.status(500).json({error:insertError.message});
    }
    res.status(201).json({message:"user created successfully",user:data});



};

