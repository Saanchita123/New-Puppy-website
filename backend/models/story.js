// backend/models/Story.js
const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  name: String,
  email: String,
  story: String,
  date: Date,
});

module.exports = mongoose.model('Blog', StorySchema, 'blogs'); // uses collection "blogs"
