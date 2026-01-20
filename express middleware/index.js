import express from 'express';
import todosRouter from './todos.routes.js';
import logger from './middleware/logger.middleware.js';

const app = express();

app.use(express.json());     // read JSON body
app.use(logger);             // app-level middleware

app.use('/todos', todosRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
