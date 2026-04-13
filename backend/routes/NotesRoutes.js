const express = require("express");
const router = express.Router();

const notesController = require("../controllers/NotesController.js");
const { isAuth } = require("../middleware/authMiddleware.js");

// NOTES ROUTES
router.post("/", isAuth, notesController.createNote);
router.get("/", isAuth, notesController.getAllTasks);
router.put("/:id", isAuth, notesController.updateTask);
router.delete("/:id", isAuth, notesController.deleteTask);

module.exports = router;