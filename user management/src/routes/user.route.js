import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controller/user.controller.js';

import { validateUser } from '../middlewares/error.middleware.js';



const router = express.Router();

/* 
   USER ROUTES
 */

// Create user
router.post('/adduser', validateUser, createUser);

// Get all users
router.get('/getallusers', getUsers);

// Get user by ID
router.get('/getuserbyid/:id', getUserById);

// Update user
router.put('/update/:id', updateUser);

// Delete user
router.delete('/delete/:id', deleteUser);

export default router;
