const express = require('express');

const router = express.Router();

// Mock data

const serverResponseTime = 200;

// Simulate server delayed response
function send (res, data) {
  setTimeout(() => {
    res.send(data);
  }, serverResponseTime);
}

/**
 * Api routes
 */

// Get Logged in user
router.post('/accounts/login', (req, res) => {
  send(res.status(200));
});

module.exports = router;
