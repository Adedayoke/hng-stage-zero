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

// Health check endpoints
app.get("/", (req, res) => {
  return res.status(200).json({ 
    status: "success",
    message: "Server is running" 
  });
});

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "healthy" });
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
  console.log(`✅ Server started successfully`);
  console.log(`Listening on 0.0.0.0:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
