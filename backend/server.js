const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");

// Enable CORS
app.use(cors());
app.use(express.json());

// PostgreSQL Client Setup
const pool = new Pool({
  user: "postgres.lnygvnjkuybbwlfpajzy",
  host: "aws-0-eu-west-1.pooler.supabase.com",
  database: "postgres",
  password: "nyfjic-zorXej-6bacru",
  port: 5432,
});

//this tis to test server is running from browser.
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Controller Route for saving daily calories
app.post("/save-daily-calories", async (req, res) => {
  const { profile_id, total_calories } = req.body;

  const date_value = new Date().toISOString();

  // Check if all required fields are provided
  if (!profile_id || !total_calories) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
        "INSERT INTO daily_calories (profile_id, total_calories, date_value) VALUES ($1, $2, $3) RETURNING *",
        [profile_id, total_calories, date_value]
    );
    res.status(200).json(result.rows[0]);  // Send the inserted row back in the response
  } catch (error) {
    console.error("Error details:", error);  // Log the actual error
    res.status(500).json({ error: "Failed to save data", details: error.message });
  }
});

// Code for starting the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
