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
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST"],
  credentials: true
}));

// ======== Middleware =========
app.use(express.json()); // Parses incoming JSON requests


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// API endpoint that was previously using questions.json
// app.get('/api/questions', async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res.json(questions);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch questions' });
//   }
// });

// Get all unique categories with their question count
app.get('/api/categories', async (req, res) => {
  try {
    const all = await Question.find();
    const categoryMap = {};

    all.forEach(q => {
      const category = q.category.trim();
      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });

    const categories = Object.entries(categoryMap).map(([category, count]) => ({
      category,
      count
    }));

    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load categories' });
  }
});

// Get questions by category or random
app.get('/api/questions/:category', async (req, res) => {
  try {
    const categoryParam = decodeURIComponent(req.params.category).toLowerCase();
    const all = await Question.find();

    let filtered;

    if (categoryParam === 'random') {
      filtered = all.sort(() => Math.random() - 0.5).slice(0, 50);
    } else {
      filtered = all
        .filter(q => q.category.trim().toLowerCase() === categoryParam)
        .sort(() => Math.random() - 0.5);
    }

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load questions for category' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
