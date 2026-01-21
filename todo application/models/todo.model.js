import fs from 'fs';
const DB_PATH = 'db.json';


export function readTodos() {
const data = fs.readFileSync(DB_PATH, 'utf-8');
return JSON.parse(data).todos;
}


export function writeTodos(todos) {
fs.writeFileSync(DB_PATH, JSON.stringify({ todos }, null, 2));
}