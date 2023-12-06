const PostRepo = require('../repositories/post.repository');
const CategoryRepo = require('../repositories/category.repository');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

class PostController {
  constructor() {
    this.postRepo = new PostRepo();
    this.categoryRepo = new CategoryRepo();
  }

  createPost = catchAsyncErrors(async (req, res, next) => {
    const { title, content, categoryId } = req.body;

    const category = await this.categoryRepo.getOne(categoryId);

    if (!category) return next(new ErrorHandler('Category not found', 404));

    const post = await this.postRepo.create({ title, content, categoryId });

    res.status(201).json({
      success: true,
      post,
    });
  });
}

module.exports = new PostController();
