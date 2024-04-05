// models/document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  documentHash: 'String',
  transactionHash: 'String',
  fileName: 'String',
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Document', documentSchema);
