const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));

// UNHANDLED ROUTES:

const foodEntry = [
  {
    foodName: "corn",
    portion: "small",
    calories: 120,
  },
  {
    foodName: "corn salad",
    portion: "small",
    calories: 120,
  },
  {
    foodName: "fried chicken",
    portion: "medium",
    calories: 300,
  },
  {
    foodName: "smoked salmon",
    portion: "large",
    calories: 170,
  },
  {
    foodName: "cheese burger",
    portion: "large",
    calories: 1200,
  },
  {
    foodName: "pancakes",
    portion: "medium",
    calories: 100,
  },
  {
    foodName: "waffles",
    portion: "large",
    calories: 400,
  },
  {
    foodName: "pizza",
    portion: "small",
    calories: 700,
  },
  {
    foodName: "salad",
    portion: "large",
    calories: 60,
  },
  {
    foodName: "bacon",
    portion: "small",
    calories: 400,
  },
  {
    foodName: "eggs",
    portion: "small",
    calories: 60,
  },
];

app.get("/api/foods", (req, res) => {
  res.json(foodEntry);
});

// UNHANDLED
app.get("*", (req, res) => {
  res.sendFile(express.static(__dirname, "../client/build", "index.html"));
});

app.listen(process.env.PORT || 3002, () => console.log("Server spinning"));
