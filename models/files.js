const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
      uuid: { type: String, required: true },
      name: { type: String, required: false },
      breed: { type: String, required: false },
      age: { type: Number, required: false },
      type: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);