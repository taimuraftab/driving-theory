const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: Number,
  category: String,
  question: String,
  image: String, // Optional image for the question
  options: [
    {
      label: String // Can be text or image filename
    }
  ],
  correct_answer: String,
  explanation: String
});

module.exports = mongoose.model('Question', questionSchema);
