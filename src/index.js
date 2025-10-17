require("dotenv").config();

const express = require("express");
const app = express();
const axios = require("axios");

const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
