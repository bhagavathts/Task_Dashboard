const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://bhagavathts_db_user:2308Bhaga@cluster0.nttdwby.mongodb.net/task_dashboard"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Port (important for hosting)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
