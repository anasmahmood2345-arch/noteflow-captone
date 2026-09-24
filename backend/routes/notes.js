
const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// GET all notes for logged-in user
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.userId });
        res.json(notes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET one note
router.get("/:id", async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// POST - create a new note
router.post("/", async (req, res) => {
    try {
        if (!req.body.title?.trim() || !req.body.content?.trim()) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const note = new Note({
            title: req.body.title,
            content: req.body.content,
            user: req.user.userId
        });

        const savedNote = await note.save();

        res.status(201).json(savedNote);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// PUT - update a note
router.put("/:id", async (req, res) => {
    try {
        if (!req.body.title?.trim() || !req.body.content?.trim()) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// DELETE - delete a note
router.delete("/:id", async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json({
            message: "Note deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// PATCH - partially update a note
router.patch("/:id", async (req, res) => {
    try {
        const updates = {};

        if (req.body.title !== undefined) {
            if (!req.body.title.trim()) {
                return res.status(400).json({
                    message: "Title cannot be empty"
                });
            }

            updates.title = req.body.title;
        }

        if (req.body.content !== undefined) {
            if (!req.body.content.trim()) {
                return res.status(400).json({
                    message: "Content cannot be empty"
                });
            }

            updates.content = req.body.content;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "Provide a title or content to update"
            });
        }

        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;

