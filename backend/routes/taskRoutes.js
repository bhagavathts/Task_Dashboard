const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");

const router = express.Router();
const JWT_SECRET = "mysecretkey";

/* ================= AUTH MIDDLEWARE ================= */

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.sendStatus(401);
  }
};

/* ================= CREATE TASK ================= */
// supports title + dueDate
router.post("/", auth, async (req, res) => {
  const { title, dueDate } = req.body;

  const task = new Task({
    title,
    dueDate,
    completed: false,
    userId: req.userId,
  });

  await task.save();
  res.json(task);
});

/* ================= GET TASKS ================= */

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

/* ================= UPDATE TASK ================= */
// edit title, dueDate, completed
router.put("/:id", auth, async (req, res) => {
  const { title, dueDate, completed } = req.body;

  const updatedTask = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId }, // user safety
    { title, dueDate, completed },
    { new: true }
  );

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(updatedTask);
});

/* ================= DELETE TASK ================= */

router.delete("/:id", auth, async (req, res) => {
  const deleted = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });

  if (!deleted) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task deleted" });
});

module.exports = router;
