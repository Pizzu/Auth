const express = require('express');
const router = express.Router();

const notes = require('./notes.js');
const middlewares = require('../middlewares');

router.get('/', (req, res) => {
  res.json({user: req.user});
});

router.use('/notes', middlewares.isLoggedIn, notes);

module.exports = router;