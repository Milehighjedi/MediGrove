const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: 'items'
  },
  itemname: {
    type: String,
    required: true
  },
  itemcompany: {
    type: String,
    required: true
  },
  itemcategory: {
    type: String,
    required: true
  },
  itemdescription: {
    type: String,
    required: true
  },
  itemsize: {
    type: String
  },
  itemprice: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
