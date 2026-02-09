// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// 1️⃣ สร้าง app ก่อน (สำคัญที่สุด)
const app = express();

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

// 5️⃣ Port
const PORT = process.env.PORT || 3000;

// 6️⃣ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
