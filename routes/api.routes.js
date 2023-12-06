const { Router } = require('express');

const userRoutes = require('./user.routes');
const categoryRoutes = require('./category.routes');

const router = Router();

router.use('/user', userRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
