require("dotenv").config(); // dotenv en başta dahil edilmeli
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const flightRoute = require("./routes/flights.js"); // flights route'u
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB bağlantısı
const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL); // .env'den alınıyor
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

// Route'ları tanımlama
app.use("/api/flights", flightRoute); // Uçuş route'u

// Sunucu başlatma
app.listen(port, () => {
  connect();
  console.log(`Server listening on port ${port}`);
});
