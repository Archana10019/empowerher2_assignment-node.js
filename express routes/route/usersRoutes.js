import express from "express";
import fs from "fs";

const router = express.Router();
const DB_PATH = "./db.json"; // change path if needed

// read data from db.json
function readDB() {
  const fileData = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(fileData);
}

// write data to db.json
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ✅ Add user
router.post("/add", (req, res) => {
  const db = readDB();

  const user = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email
  };

  db.users.push(user);
  writeDB(db);

  res.status(201).json({
    message: "User added successfully",
    user
  });
});

// ✅ Get all users
router.get("/", (req, res) => {
  const db = readDB();
  res.status(200).json(db.users);
});

// ✅ Get single user
router.get("/:userid", (req, res) => {
  const db = readDB();
  const userid = Number(req.params.userid);

  let foundUser = null;

  for (let user of db.users) {
    if (user.id === userid) {
      foundUser = user;
      break;
    }
  }

  if (!foundUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(foundUser);
});

// ✅ Update user
router.put("/update/:userid", (req, res) => {
  const db = readDB();
  const userid = Number(req.params.userid);

  let userFound = false;

  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === userid) {
      db.users[i].name = req.body.name || db.users[i].name;
      db.users[i].email = req.body.email || db.users[i].email;
      userFound = true;
      break;
    }
  }

  if (!userFound) {
    return res.status(404).json({ message: "User not found" });
  }

  writeDB(db);
  res.status(200).json({ message: "User updated successfully" });
});

// ✅ Delete user
router.delete("/delete/:userId", (req, res) => {
  const db = readDB();
  const userId = Number(req.params.userId);

  const originalLength = db.users.length;

  db.users = db.users.filter((user) => user.id !== userId);

  if (db.users.length === originalLength) {
    return res.status(404).json({ message: "User not found" });
  }

  writeDB(db);
  res.status(200).json({ message: "User deleted successfully" });
});

export default router;
