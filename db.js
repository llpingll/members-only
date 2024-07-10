const mongoose = require("mongoose");

// Load environment variables from .env file if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Get the database connection string
const DB = process.env.DATABASE_URI;
