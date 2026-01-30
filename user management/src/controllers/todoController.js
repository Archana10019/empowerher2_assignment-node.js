
import { supabase } from "../config/supabase.js";
import express from "express";


export const addTodo=async (req,res) => {
    const { title,description,userId } = req.body;
//validating input
    if(!title || !userId){

        return res.status(400).json({ error: "Title and UserId are required." });
    }

    //checking if user exists
    const{data:user,error}=await supabase
    .from("userss")
    .select("id")
    .eq("id",userId)
    .single();
    if(error || !user){
        return res.status(400).json({ error: "User does not exist/ not found." });
    }
    //inserting todo
    const{data,error:Toodoerror}=await supabase
    .from("todos")
    .insert([{title,description,user_id:userId}])
    .select();

    if(Toodoerror){
        return res.status(500).json({ error: Toodoerror.message });
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: "Todo created successfully", todo: data });
};

///get user todos

export const getMyTodos=async(req,res)=>{
    const {userId}=req.params;
    //fetching all todo that belohgs to specific user
    const{data:error,todos}=await supabase
    .from("todos")
    .select("*")
    .eq("user_id",userId); 
    
    
    if(error){
        return res.status(500).json({error:error.message});
    }
    res.status(200).json({ todos });
};
//upadte todo
export const updateTodo=async(req,res)=>{
    const {todoId}=req.params;
    const updates=req.body;

    const{data:todo}=await supabase
    .from("todos")
    .select("*")
    .eq("id",todoId)
    .single();

    if(!todo){
        return res.status(404).json({error:"todo not found"});
    }

    const{data:error}=await supabase
    .from("todos")
    .update(updates)
    .eq("id",todoId)
    .select();
    if(error){
        return res.status(500).json({error:error.message});
    }   
    res.status(200).json({message:"todo updated successfully",todo:data});
};

//delete todo
export const deleteTodo=async(req,res)=>{
    const {todoId}=req.params;  
    const{error}=await supabase
    .from("todos")
    .delete()
    .eq("id",todoId);
    if(error){
        return res.status(500).json({error:error.message});
    }   
    res.status(200).json({message:"todo deleted successfully"});

};