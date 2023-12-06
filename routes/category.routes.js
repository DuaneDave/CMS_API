const { Router } = require('express');

const { createCategory } = require('../controllers/category.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = Router();

router.post('/', isAuthenticatedUser, createCategory);

module.exports = router;
