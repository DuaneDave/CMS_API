const CategoryRepo = require('../repositories/category.repository');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

class CategoryController {
  constructor() {
    this.categoryRepo = new CategoryRepo();
  }

  createCategory = catchAsyncErrors(async (req, res, next) => {
    const { name } = req.body;

    const category = await this.categoryRepo.create({ name });

    res.status(201).json({
      success: true,
      category,
    });
  });

  getAllCategories = catchAsyncErrors(async (req, res, next) => {
    const categories = await this.categoryRepo.getAll();

    res.status(200).json({
      success: true,
      categories,
    });
  });

  editCategory = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = await this.categoryRepo.update(id, { name });

    res.status(200).json({
      success: true,
      category,
    });
  });

  deleteCategory = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const category = await this.categoryRepo.delete(id);

    res.status(200).json({
      success: true,
      category,
    });
  });
}

module.exports = new CategoryController();
