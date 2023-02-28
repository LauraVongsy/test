const express = require("express");

const router = express.Router();

const { addToQueue } = require("../controllers/queue.controller");

router.post("/", addToQueue);

module.exports = router;
