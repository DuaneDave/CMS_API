const { Router } = require('express');

const {
  createCategory,
  getAllCategories,
} = require('../controllers/category.controller');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = Router();

router.get('/', getAllCategories);
router.post('/', isAuthenticatedUser, createCategory);

module.exports = router;
