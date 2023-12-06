const { Router } = require('express');

const userRoutes = require('./user.routes');
const categoryRoutes = require('./category.routes');
const adminRoutes = require('./admin.routes');

const router = Router();

router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
