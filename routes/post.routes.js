const { Router } = require('express');

const {
  createPost,
  getAll,
  editPost,
  deletePost,
} = require('../controllers/post.controller');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = Router();

router.get('/', getAll('categoryId authorId', 'name'));
router.post('/', isAuthenticatedUser, createPost);
router.put('/:id', isAuthenticatedUser, editPost);
router.delete('/:id', isAuthenticatedUser, deletePost);

module.exports = router;
