const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
