const express = require('express');
const router = express.Router();

const notes = require('../controllers/notes.js');

router.get('/', (req, res, next) => {
  notes.getAllNotes(req, res, next);
});

router.post("/", (req, res, next) => {
  notes.createNote(req, res, next);
});



module.exports = router;