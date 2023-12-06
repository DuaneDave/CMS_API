const { Router } = require('express');

const { editCategory, deleteCategory } = require('../controllers/category.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = Router();

router.put('/categories/:id', isAuthenticatedUser, authorizeRoles('admin'), editCategory);
router.delete('/categories/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);


module.exports = router;
