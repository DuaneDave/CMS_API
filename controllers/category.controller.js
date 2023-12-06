const Category = require('../models/category.model');
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
}

module.exports = new CategoryController();
