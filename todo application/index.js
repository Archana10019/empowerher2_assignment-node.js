import express from'express';
import todoRoutes from'./routes/todo.routes.js';
const app=express();
app.use(express.json());
app.use('/todos',todoRoutes);
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});