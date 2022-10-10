const router = require('express').Router();
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');

// *** Are these correct routes?
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

module.exports = router;