const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter category name'],
    trim: true,
    maxLength: [50, 'Category name cannot exceed 50 characters']
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  timestamps: true
});

module.exports = model('Category', categorySchema);