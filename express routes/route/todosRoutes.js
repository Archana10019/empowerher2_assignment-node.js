import express from "express";
import fs from "fs";

const router = express.Router();
const DB_PATH = "./src/db.json";

// 📌 Read db.json
function readDB() {
  const fileData = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(fileData);
}

// 📌 Write to db.json
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ================= TODO ROUTES =================

// ✅ Add Todo
router.post("/add", (req, res) => {
  const db = readDB();

  const todo = {
    id: Date.now(),
    title: req.body.title,
    completed: req.body.completed || false
  };

  db.todos.push(todo);
  writeDB(db);

  res.status(201).json({
    message: "Todo added successfully",
    todo
  });
});

// ✅ Get All Todos
router.get("/", (req, res) => {
  const db = readDB();
  res.status(200).json(db.todos);
});

// ✅ Get Single Todo
router.get("/:todoId", (req, res) => {
  const db = readDB();
  const todoId = Number(req.params.todoId);

  let foundTodo = null;

  for (let todo of db.todos) {
    if (todo.id === todoId) {
      foundTodo = todo;
      break;
    }
  }

  if (!foundTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(200).json(foundTodo);
});

// ✅ Update Todo
router.put("/update/:todoId", (req, res) => {
  const db = readDB();
  const todoId = Number(req.params.todoId);

  let todoFound = false;

  for (let i = 0; i < db.todos.length; i++) {
    if (db.todos[i].id === todoId) {
      db.todos[i].title = req.body.title || db.todos[i].title;
      db.todos[i].completed =
        req.body.completed !== undefined
          ? req.body.completed
          : db.todos[i].completed;

      todoFound = true;
      break;
    }
  }

  if (!todoFound) {
    return res.status(404).json({ message: "Todo not found" });
  }

  writeDB(db);
  res.status(200).json({ message: "Todo updated successfully" });
});

// ✅ Delete Todo
router.delete("/delete/:todoId", (req, res) => {
  const db = readDB();
  const todoId = Number(req.params.todoId);

  const originalLength = db.todos.length;

  db.todos = db.todos.filter((todo) => todo.id !== todoId);

  if (db.todos.length === originalLength) {
    return res.status(404).json({ message: "Todo not found" });
  }

  writeDB(db);
  res.status(200).json({ message: "Todo deleted successfully" });
});

export default router;
