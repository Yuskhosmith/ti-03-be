const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: ''},
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Group', GroupSchema);
