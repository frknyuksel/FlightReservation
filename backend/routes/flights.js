const express = require("express");
const axios = require("axios");
const Flight = require("../models/flightModel.js");
const router = express.Router();

// Schiphol API bilgileri
const flightApiUrl = 'https://api.schiphol.nl/public-flights/flights';
const appKey = process.env.SCHIPHOL_API_KEY;
const appId = process.env.SCHIPHOL_APP_ID;

// Uçuşları almak için endpoint
router.get("/", async (req, res) => {
  try {
    const { direction, flightdate } = req.query;
    const response = await axios.get(flightApiUrl, {
      headers: {
        app_id: appId,
        app_key: appKey,
        resourceversion: "v4",
        Accept: "application/json",
      },
      params: {
        scheduleDate: flightdate,
        flightDirection: direction,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching flight data:", error);
    res.status(500).send("Error fetching flight data");
  }
});

// Yeni uçuş eklemek için endpoint
router.post("/add-flight", async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    await newFlight.save();
    res.status(200).json("Flight added successfully!");
  } catch (error) {
    console.error("Error saving flight:", error);
    res.status(500).json({ message: "Error adding flight", error: error.message });
  }
});

// Tüm uçuşları almak için endpoint
router.get("/get-flight", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    console.error("Error fetching flight data from MongoDB:", error);
    res.status(500).json({ message: "Error fetching flight data from MongoDB", error: error.message });
  }
});

// Uçuş silmek için endpoint
router.delete("/delete-flight", async (req, res) => {
  try {
    const { id } = req.body;
    const flight = await Flight.findOne({ id: id });
    if (!flight) return res.status(404).json({ message: "Flight not found." });

    await Flight.findByIdAndDelete(flight._id);
    res.status(200).json({ message: "Flight deleted successfully." });
  } catch (error) {
    console.error("Error deleting flight:", error.message);
    res.status(500).json({ message: "Error deleting flight", error: error.message });
  }
});

module.exports = router;
