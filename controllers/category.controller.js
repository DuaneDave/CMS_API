const CategoryRepo = require('../repositories/category.repository');
const PostRepo = require('../repositories/post.repository');
const UserRepo = require('../repositories/user.repository');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

class CategoryController {
  constructor() {
    this.categoryRepo = new CategoryRepo();
    this.postRepo = new PostRepo();
    this.userRepo = new UserRepo();
  }

  createCategory = catchAsyncErrors(async (req, res, next) => {
    const { name } = req.body;

    const category = await this.categoryRepo.create({ name });

    this.categoryRepo.ok(res, 201, category);
  });

  getAllCategories = catchAsyncErrors(async (req, res, next) => {
    const categories = await this.categoryRepo.getAll();

    this.categoryRepo.ok(res, 200, categories);
  });

  editCategory = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = await this.categoryRepo.update(id, { name });

    this.categoryRepo.ok(res, 200, category);
  });

  deleteCategory = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const category = await this.categoryRepo.delete(id);

    await this.userRepo.updateMany(
      { 'posts.categoryId': id },
      { $pull: { posts: { categoryId: id } } }
    );

    await this.postRepo.deleteMany({ categoryId: id });

    this.categoryRepo.ok(res, 200, category);
  });
}

module.exports = new CategoryController();
