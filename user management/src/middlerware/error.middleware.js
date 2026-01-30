
import express from 'express';


export const validateUser = (req, res, next) => {
  const { name, email, password, age } = req.body;

  // Name validation
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  // Password validation
  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 8 characters' });
  }

  // Age validation (optional)
  if (age !== undefined && age < 18) {
    return res
      .status(400)
      .json({ error: 'Age must be 18 or above' });
  }

  // Everything OK → go to controller
  next();
};


 
