const router = require('express').Router();
const photoRoutes = require('./photoAPI');

router.use('/photos', photoRoutes);

module.exports = router;