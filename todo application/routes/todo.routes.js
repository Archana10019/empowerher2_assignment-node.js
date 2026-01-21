import express from 'express';
import {
getAllTodos,
addTodo,
getTodoById,
updateTodo,
deleteTodo
} from '../controllers/todo.controller.js';


const router = express.Router();


router.get('/', getAllTodos);
router.post('/add', addTodo);
router.get('/:id', getTodoById);
router.put('/update/:id', updateTodo);
router.delete('/delete/:id', deleteTodo);


export default router;