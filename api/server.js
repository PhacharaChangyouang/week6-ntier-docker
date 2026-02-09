// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// 1️⃣ สร้าง app ก่อน (สำคัญที่สุด)
const app = express();

// Database connection
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});


// 2️⃣ CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:8080',
      'https://localhost',
      /\.railway\.app$/
    ];

    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed instanceof RegExp) return allowed.test(origin);
      return allowed === origin;
    });

    // สำหรับ Lab อนุญาตหมด
    callback(null, true);
  },
  credentials: true
};

// 3️⃣ Middleware
app.use(cors(corsOptions));
app.use(express.json());

// 4️⃣ Test route
app.get('/', (req, res) => {
  res.send('TaskBoard API is running 🚀');
});

// ============================================
// Task API Routes
// ============================================
app.get('/api/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: err.message });
    }
});
// POST: Add new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    const result = await pool.query(
      'INSERT INTO tasks (title, status, priority) VALUES ($1, $2, $3) RETURNING *',
      [title, 'TODO', 'MEDIUM']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT: Update task status
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      'UPDATE tasks SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *',
      [status, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: err.message });
  }
});

// 5️⃣ Port
const PORT = process.env.PORT || 3000;

// 6️⃣ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
