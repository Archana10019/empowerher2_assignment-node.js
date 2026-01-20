import express from 'express';
import fs from 'fs';
import rateLimiter from './middleware/rateLimiter.middleware.js';
import validateTodo from './middleware/validateTodo.middleware.js';

const router = express.Router();

function readDB() {
  return JSON.parse(fs.readFileSync('db.json', 'utf-8'));
}

function writeDB(data) {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
}

// CREATE TODO
router.post('/add', validateTodo, (req, res) => {
  const data = readDB();

  const newTodo = {
    id: Date.now(),
    title: req.body.title
  };

  data.todos.push(newTodo);
  writeDB(data);

  res.status(201).json(newTodo);
});

// GET ALL TODOS (rate limited)
router.get('/', rateLimiter, (req, res) => {
  const data = readDB();
  res.json(data.todos);
});

// GET SINGLE TODO
router.get('/:id', (req, res) => {
  const data = readDB();
  const todo = data.todos.find(t => t.id == req.params.id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.json(todo);
});

// UPDATE TODO
router.put('/update/:id', (req, res) => {
  const data = readDB();
  const todo = data.todos.find(t => t.id == req.params.id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.title = req.body.title || todo.title;
  writeDB(data);

  res.json(todo);
});

// DELETE TODO
router.delete('/delete/:id', (req, res) => {
  const data = readDB();
  data.todos = data.todos.filter(t => t.id != req.params.id);
  writeDB(data);

  res.json({ message: 'Todo deleted' });
});

export default router;
