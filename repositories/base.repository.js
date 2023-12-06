class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getOne(id) {
    return await this.model.findOne(id);
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

  async findById (id) {
    return await this.model.findById(id);
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async deleteMany(conditions) {
    return await this.model.deleteMany(conditions);
  }
}

module.exports = BaseRepository;
