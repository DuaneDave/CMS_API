const { Router } = require('express');

const userRoutes = require('./user.routes');
const postRoutes = require('./post.routes');
const adminRoutes = require('./admin.routes');
const categoryRoutes = require('./category.routes');

const router = Router();

router.use('/user', userRoutes);
router.use('/posts', postRoutes);
router.use('/admin', adminRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
