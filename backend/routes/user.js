const express = require('express');
const router = express.Router();
const User = require('../models/story');

// GET all users
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST a user
router.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  res.json(savedUser);
});

module.exports = router;
