const PostRepo = require('../repositories/post.repository');
const CategoryRepo = require('../repositories/category.repository');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

class PostController {
  constructor() {
    this.postRepo = new PostRepo();
    this.categoryRepo = new CategoryRepo();
  }
  
}
