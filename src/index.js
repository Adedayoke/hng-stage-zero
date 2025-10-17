require("dotenv").config();

const express = require("express");
const app = express();
const axios = require("axios");

const port = process.env.PORT || 3000;

// Health check and readiness
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

async function fetchCatFact() {
  try {
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000,
    });
    return response.data;
  } catch (error) {
    return null;
  }
}

// Simple health check endpoint
app.get("/", (req, res) => {
  console.log('Health check endpoint hit');
  res.status(200).send('OK');
  console.log('Response sent');
});

// Alternative health check for Railway
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.get("/me", async (req, res) => {
  try {
    const fetchedData = await fetchCatFact();
    if (!fetchedData) {
      res.status(200).json({
        status: "success",
        user: {
          email: "adedayoke2006@gmail.com",
          name: "Oke Habeeb Adedayo",
          stack: "Node.js/Express",
        },
        timestamp: new Date().toISOString(),
        fact: "Cats have five toes on their front paws, but only four toes on their back paws.",
      });
      return;
    }

    res
      .set("Content-Type", "application/json")
      .status(200)
      .json({
        status: "success",
        user: {
          email: "adedayoke2006@gmail.com",
          name: "Oke Habeeb Adedayo",
          stack: "Node.js/Express",
        },
        timestamp: new Date().toISOString(),
        fact: fetchedData.fact,
      });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server successfully started on 0.0.0.0:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check: http://0.0.0.0:${port}/`);
  console.log(`Profile endpoint: http://0.0.0.0:${port}/me`);
  
  // Confirm server is listening
  const address = server.address();
  console.log(`Server address info:`, address);
});

// Error handling
server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

// Keep alive
setInterval(() => {
  console.log(`Server still alive at ${new Date().toISOString()}`);
}, 30000); // Log every 30 seconds

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
