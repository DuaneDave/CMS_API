const CategoryRepo = require('../repositories/category.repository');
const PostRepo = require('../repositories/post.repository');
const UserRepo = require('../repositories/user.repository');
const BaseController = require('./base.controller');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

class CategoryController extends BaseController {
  constructor() {
    super(CategoryRepo);
    this.postRepo = new PostRepo();
    this.userRepo = new UserRepo();
  }

  createCategory = catchAsyncErrors(async (req, res, next) => {
    const { name } = req.body;

    const category = await this.model.create({ name });

    this.model.emitEvent(
      'categoryCreated',
      `${category.name} category created`
    );

    this.model.ok(res, 201, category);
  });

  deleteCategory = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const category = await this.model.delete(id);

    await this.userRepo.updateMany(
      { 'posts.categoryId': id },
      { $pull: { posts: { categoryId: id } } }
    );

    await this.postRepo.deleteMany({ categoryId: id });

    this.model.emitEvent(
      'categoryDeleted',
      `${category.name} category deleted`
    );

    this.model.ok(res, 200, category);
  });
}

module.exports = new CategoryController();
