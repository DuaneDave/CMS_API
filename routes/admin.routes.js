const { Router } = require('express');

const { edit, deleteCategory } = require('../controllers/category.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = Router();

router.put(
  '/categories/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  edit('categoryUpdated', 'name', 'category updated')
);
router.delete(
  '/categories/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  deleteCategory
);

module.exports = router;
