// // server/index.js
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = 5000;

// // Temporary placeholder question data
// const questions = require('./questions.json');

// app.use(cors());

// app.get('/api/questions', (req, res) => {
//   res.json(questions);
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Backend running at http://localhost:${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./questionModel');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// API endpoint that was previously using questions.json
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
