const { Router } = require('express');

const { createCategory, getAll } = require('../controllers/category.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = Router();

router.get('/', getAll());
router.post('/', isAuthenticatedUser, createCategory);


module.exports = router;
