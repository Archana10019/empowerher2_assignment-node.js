import express from "express";
import{
    addTodo,
    getMyTodos,
    updateTodo,
    deleteTodo      
}from'../controllers/todoController.js';

const router=express.Router();

router.post("/add",addTodo);
router.get("/getMyTodos/:userId",getMyTodos);
router.put("/update/:todoId",updateTodo);
router.delete("/delete/:todoId",deleteTodo);

export default router;