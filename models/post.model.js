const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter post title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter post description'],
      trim: true,
      maxLength: [500, 'Post description cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please enter post content'],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Post', postSchema);
