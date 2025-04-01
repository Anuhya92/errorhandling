import express from "express";
import { createReservation, getReservation } from "./database.js";

const app = express();

app.use(express.json());
app.use((error, res, req, next) => {
  const message = getErrorMessage(error.message);
  res.status(500).json({
    message: message,
  });
});

app.post("/reserve", (req, res) => {
  createReservation(req.body, (error, result) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    res.status(201).json({ message: "Reservation successful", data: result });
  });
});

app.get("/reserve/:id", async (req, res) => {
  try {
    const response = await getReservation(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: "Could not get reservation" });
  }
});

app.get("/broken-route", async (req, res, next) => {
  next(new Error("This route is broken on purpose database"));
});

app.listen(3000, () => console.log("Server running on port 3000"));

const getErrorMessage = (error) => {
  const errorMessage = error.message.toLowerCase();
  if (errorMessage.includes("database")) {
    return "Error occurred while trying to retrieve from database";
  } else if (errorMessage.includes("not found")) {
    return "Reservation you are trying to fetch is not found";
  } else {
    return "Something weird happened, else you wont see this message";
  }
};
