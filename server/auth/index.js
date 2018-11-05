const express = require('express');
const router = express.Router();

const signup = require('./signup.js');
const signin = require('./signin.js');

router.get('/', (req, res) => {
  res.json({message: 'Auth Path 🔐'});
});

router.use('/signup', signup);
router.use('/signin', signin);

module.exports = router;