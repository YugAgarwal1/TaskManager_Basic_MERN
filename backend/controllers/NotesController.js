const Notes = require("../model/Notes.js");

exports.createNote = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { title, description, completed, dueDate } = req.body;
    const note = await Notes.create({
      title,
      description,
      completed,
      dueDate,
      userId: req.session.userId,
    });
    res.status(201).json({ message: "Task Added Successfully" });
  } catch (e) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.session.userId;
    const tasks = await Notes.find({
      userId: userId,
    });
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    if (!req.session.userId)
      return res.status(401).json({ error: "Unauthorized user" });
    const paramId = req.params.id;
    const task = await Notes.findById(paramId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (task.userId.toString() !== req.session.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const updatedTask = await Notes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    if (!req.session.userId)
      return res.status(401).json({ error: "Unauthorized user" });
    const paramId = req.params.id;
    const task = await Notes.findById(paramId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (task.userId.toString() !== req.session.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }
    await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
