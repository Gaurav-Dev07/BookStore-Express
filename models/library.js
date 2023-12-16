const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;