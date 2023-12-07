const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

class BaseController {
  constructor(model) {
    this.model = new model();
  }

  getAll = (options = '', field = '') =>
    catchAsyncErrors(async (req, res, next) => {
      const data = await this.model.getAll(options, field);

      this.model.ok(res, 200, data);
    });

  edit = (event, eventTarget, message, callback) =>
    catchAsyncErrors(async (req, res, next) => {
      const { id } = req.params;
      const body = req.body;

      if (callback) await callback(id, req, next);

      const data = await this.model.update(id, { ...body });

      this.model.emitEvent(event, `${data[eventTarget]} ${message}`);

      this.model.ok(res, 200, data);
    });
}

module.exports = BaseController;
