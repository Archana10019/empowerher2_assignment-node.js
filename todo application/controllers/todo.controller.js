import { readTodos, writeTodos } from '../models/todo.model.js';

// GET all todos
export const getAllTodos = (req, res) => {
  try {
    const todos = readTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

// ADD new todo
export const addTodo = (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todos = readTodos();

    const newTodo = {
      id: Date.now(),
      title
    };

    todos.push(newTodo);
    writeTodos(todos);

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
};

// GET single todo by id
export const getTodoById = (req, res) => {
  try {
    const todos = readTodos();
    const todo = todos.find(t => t.id == req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get todo' });
  }
};

// UPDATE todo
export const updateTodo = (req, res) => {
  try {
    const todos = readTodos();
    const todo = todos.find(t => t.id == req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.title = req.body.title || todo.title;
    writeTodos(todos);

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

// DELETE todo
export const deleteTodo = (req, res) => {
  try {
    let todos = readTodos();
    const initialLength = todos.length;

    todos = todos.filter(t => t.id != req.params.id);

    if (todos.length === initialLength) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    writeTodos(todos);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};
