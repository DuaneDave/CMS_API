const Posts = require('../models/post.model');

const PostRepo = require('../repositories/post.repository');
const CategoryRepo = require('../repositories/category.repository');
const UserRepo = require('../repositories/user.repository');
const BaseController = require('./base.controller');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

class PostController extends BaseController {
  constructor() {
    super(PostRepo);
    this.categoryRepo = new CategoryRepo();
    this.userRepo = new UserRepo();
  }

  createPost = catchAsyncErrors(async (req, res, next) => {
    const { title, content, description, categoryId } = req.body;

    const category = await this.categoryRepo.findById(categoryId);

    if (!category) return next(new ErrorHandler('Category not found', 404));

    const post = await this.model.create({
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

    this.model.emitEvent('postCreated', `${post.title} post created`);

    this.model.ok(res, 201, post);
  });

  editPost = this.edit(
    'postUpdated',
    'title',
    'post updated',
    async (id, req, next) => {
      const foundPost = await this.model.findById(id);

      if (foundPost.authorId.toString() !== req.user.id)
        return next(
          new ErrorHandler('You are not authorized to edit this post')
        );
    }
  );

  deletePost = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const post = await this.model.delete(id);

    await this.categoryRepo.update(post.categoryId, {
      $pull: { posts: post._id },
    });

    await this.userRepo.update(post.authorId, {
      $pull: { posts: post._id },
    });

    this.model.emitEvent('postDeleted', `${post.title} post got deleted`);

    this.model.ok(res, 200, post);
  });
}

module.exports = new PostController();
