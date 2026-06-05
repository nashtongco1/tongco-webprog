require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});