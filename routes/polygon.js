const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require('dotenv');

// Middleware d'auth (à importer dans index.js si nécessaire)
const authMiddleware = require('../middlewares/auth'); // optionnel

router.get('/prix', authMiddleware, async (req, res) => {
  try {
    const response = await axios.get('https://api.polygon.io/v1/last/stocks/AAPL', {
      params: {
        apiKey: process.env.POLYGON_API_KEY
      }
    });

    const { price, exchange, size } = response.data.last;
    res.json({ price, exchange, size, timestamp: Date.now() });

  } catch (err) {
    console.error('Erreur avec Polygon.io:', err.message);
    res.status(500).json({ message: "Erreur côté serveur." });
  }
});

module.exports = router;
