// Import Express Router
const router = require('express').Router();

// Import api and home routes
const apiRoutes = require('./api');
const homeRoutes = require("./homeRoutes.js")

router.use("/", homeRoutes)
router.use('/api', apiRoutes);

module.exports = router;
