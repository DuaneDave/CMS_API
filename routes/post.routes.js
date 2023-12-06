const { Router } = require('express');

const { createPost, getPosts } = require('../controllers/post.controller');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = Router();

router.get('/', getPosts);
router.post('/', isAuthenticatedUser, createPost);

module.exports = router;
