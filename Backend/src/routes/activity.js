const express = require("express");
const getRecentActivity = require("../controlers/getRecentActivity");
const router = express.Router();

router.get("/", getRecentActivity);

module.exports = router;