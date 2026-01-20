import express from 'express';
import usersRoutes from '../route/usersRoutes.js';
 import todoRoutes from '../route/todoRoutes.js';

const app=express();
app.use(express.json());

routes
app.use('/users',usersRoutes);
 app.use('/todos',todoRoutes);

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
