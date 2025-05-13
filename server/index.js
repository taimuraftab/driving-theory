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
const cors = require('cors');
const Question = require('./questionModel');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup to allow requests from your frontend
const allowedOrigins = ["https://drivingtheory.onrender.com"]; 

app.use(cors({
  origin: allowedOrigins,  // Allow only your frontend domain
  methods: ["GET", "POST"],
  credentials: true,  // Allow cookies if needed
}));


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
