const Posts = require('../models/post.model');

const PostRepo = require('../repositories/post.repository');
const CategoryRepo = require('../repositories/category.repository');
const UserRepo = require('../repositories/user.repository');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

class PostController {
  constructor() {
    this.postRepo = new PostRepo();
    this.categoryRepo = new CategoryRepo();
    this.userRepo = new UserRepo();
  }

  createPost = catchAsyncErrors(async (req, res, next) => {
    const { title, content, description, categoryId } = req.body;

    const category = await this.categoryRepo.findById(categoryId);

    if (!category) return next(new ErrorHandler('Category not found', 404));

    const post = await this.postRepo.create({
      title,
      content,
      categoryId,
      description,
      authorId: req.user.id,
    });

    await this.userRepo.update(req.user.id, {
      $push: { posts: { postId: post._id, categoryId } },
    });

    category.posts.push(post._id);
    await category.save();

    this.postRepo.emitEvent('postCreated', `${post.title} post created`);

    this.postRepo.ok(res, 201, post);
  });

  getPosts = catchAsyncErrors(async (req, res, next) => {
    const posts = await Posts.find().populate('categoryId authorId', 'name');

    this.postRepo.ok(res, 200, posts);
  });

  editPost = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { title, content, description, categoryId } = req.body;

    const foundPost = await this.postRepo.findById(id);

    if (foundPost.authorId.toString() !== req.user.id)
      return next(new ErrorHandler('You are not authorized to edit this post'));

    const post = await this.postRepo.update(id, {
      title,
      content,
      description,
      categoryId,
    });

    this.postRepo.emitEvent('postUpdated', `${post.title} post got updated`);

    this.postRepo.ok(res, 200, post);
  });

  deletePost = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const post = await this.postRepo.delete(id);

    await this.categoryRepo.update(post.categoryId, {
      $pull: { posts: post._id },
    });

    await this.userRepo.update(post.authorId, {
      $pull: { posts: post._id },
    });

    this.postRepo.emitEvent('postDeleted', `${post.title} post got deleted`);

    this.postRepo.ok(res, 200, post);
  });
}

module.exports = new PostController();
