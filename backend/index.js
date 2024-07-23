const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const crudOperation = require("./routes/crud");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust as necessary for your frontend URL
  })
);
app.use(bodyParser.json());
app.use("/auth", authRoutes);
// app.use("/api", protectedRoutes);
app.use("/crud", crudOperation);
mongoose
  .connect(
    "mongodb+srv://ravirajsahu312:3g39Ao6AtNx9R1DF@task.lsnkyx4.mongodb.net/?retryWrites=true&w=majority&appName=task"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection error", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
