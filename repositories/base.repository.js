class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getOne(param) {
    return await this.model.findOne(param);
  }

  async getAll() {
    return await this.model.find();
  }

  async create(entity) {
    return await this.model.create(entity);
  }

  async update(id, entity) {
    return await this.model.findByIdAndUpdate(id, entity, { new: true });
  }

  async updateMany(conditions, entity) {
    return await this.model.updateMany(conditions, entity);
  }

  async findById (id) {
    return await this.model.findById(id);
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async deleteMany(conditions) {
    return await this.model.deleteMany(conditions);
  }

  ok(res, code, data) {
    return res.status(code).json({
      success: true,
      data,
    });
  }
}

module.exports = BaseRepository;
