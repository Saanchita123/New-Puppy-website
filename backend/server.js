const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ✅ Import your Story model
const Story = require('./models/story');

// ✅ Submit route
app.post('/submit', async (req, res) => {
  const { name, email, story, date } = req.body;
  try {
    const newStory = new Story({ name, email, story, date });
    await newStory.save();
    res.status(201).json({ message: 'Story submitted successfully' });
  } catch (error) {
    console.error('❌ Error saving story:', error);
    res.status(500).json({ error: 'Failed to save story' });
  }
});

// ✅ GET all stories
app.get('/all-stories', async (req, res) => {
  try {
    const allStories = await Story.find({});
    res.json(allStories);
  } catch (error) {
    console.error('❌ Failed to fetch stories:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
