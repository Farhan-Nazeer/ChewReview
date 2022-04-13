const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const reviewRoute = require("./routes/reviewRoutes");
const userRoute = require("./routes/userRoutes");

app.use("/api/reviews", reviewRoute);
app.use("/api/users", userRoute);

//Comment out next two lines for running app locally
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html")))

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server successfully started on port ${port}`)
);
