const { Router } = require('express');

const { createPost, getPosts, editPost, deletePost } = require('../controllers/post.controller');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = Router();

router.get('/', getPosts);
router.post('/', isAuthenticatedUser, createPost);
router.put('/:id', isAuthenticatedUser, editPost);
router.delete('/:id', isAuthenticatedUser, deletePost);

module.exports = router;
