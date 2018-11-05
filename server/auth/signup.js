const express = require('express');
const router = express.Router();

const authentication = require('../controllers/authentication.js');

router.post('/', (req, res, next) => {
  authentication.signupUser(req, res, next);
});

module.exports = router;