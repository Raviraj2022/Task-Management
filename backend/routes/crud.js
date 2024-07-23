const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../authMiddleware");
const router = express.Router();

// Create a new task
router.post("/tasks", authMiddleware, async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ error: "Failed to create task" });
  }
});

// Get all tasks
router.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch tasks" });
  }
});

// Update a task by ID
router.put("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.send(task);
  } catch (error) {
    res.status(400).send({ error: "Failed to update task" });
  }
});

// Delete a task by ID
router.delete("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.send({ message: "Task deleted" });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete task" });
  }
});

router.get("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id); // Use findById to fetch the task by its ID

    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    res.send(task);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch task" });
  }
});
module.exports = router;
