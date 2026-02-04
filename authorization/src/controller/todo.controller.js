import { supabase } from '../config/supabase.js';


// CREATE TODO
export const createTodo = async (req, res) => {
try {
const { title } = req.body;


const { error } = await supabase.from('todos').insert([
{
title,
completed: false,
user_id: req.user.userId
}
]);


if (error) throw error;


res.status(201).json({ message: 'Todo created' });
} catch (err) {
    res.status(500).json({ message: err.message });
}
};


// GET TODOS
export const getTodos = async (req, res) => {
try {
const { data, error } = await supabase
.from('todos')
.select('*')
.eq('user_id', req.user.userId);


if (error) throw error;


res.json(data);
} catch (err) {
res.status(500).json({ message: err.message });
}
};


// UPDATE TODO
export const updateTodo = async (req, res) => {

    try {
const { id } = req.params;
const { title, completed } = req.body;


const { data: todo } = await supabase
.from('todos')
.select('*')
.eq('id', id)
.single();


if (!todo || todo.user_id !== req.user.userId) {
return res.status(403).json({ message: 'Forbidden' });
}


const { error } = await supabase
.from('todos')
.update({ title, completed })
.eq('id', id);


if (error) throw error;
res.json({ message: 'Todo updated' });
} catch (err) {
res.status(500).json({ message: err.message });
}
};


// DELETE TODO
export const deleteTodo = async (req, res) => {
try {
const { id } = req.params;


const { data: todo } = await supabase
.from('todos')
.select('*')
.eq('id', id)
.single();


if (!todo || todo.user_id !== req.user.userId) {
return res.status(403).json({ message: 'Forbidden' });
}


const { error } = await supabase
.from('todos')
.delete()
.eq('id', id);


if (error) throw error;


res.json({ message: 'Todo deleted' });
} catch (err) {
res.status(500).json({ message: err.message });
}
};