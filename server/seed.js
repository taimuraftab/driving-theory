const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs');
const Question = require('./questionModel');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const data = JSON.parse(fs.readFileSync('./questions.json', 'utf-8'));
  await Question.deleteMany(); // Clear old data
  await Question.insertMany(data);
  console.log('Database seeded');
  mongoose.disconnect();
});
