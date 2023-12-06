const BaseRepository = require('./base.repository');
const Post = require('../models/post.model');

class PostRepository extends BaseRepository {
  constructor() {
    super(Post);
  }
}

module.exports = PostRepository;