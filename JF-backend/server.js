const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fs = require("fs");
const path = require("path");

dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(cors());

const routePath = path.join(__dirname, "./routes");

fs.readdirSync(routePath).forEach((file) => {
  if (file.endsWith(".js")) {
    const route = require(path.join(routePath, file));
    app.use("/api", route);
  }
});

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})
