const { Router } = require('express');

const { editCategory } = require('../controllers/category.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = Router();

router.put('/category/:id', isAuthenticatedUser, authorizeRoles('admin'), editCategory);


module.exports = router;
