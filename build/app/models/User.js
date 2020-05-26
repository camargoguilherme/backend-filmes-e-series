"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

const UserSchema = new _mongoose2.default.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  token: String,
  fcm_token: String,
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  hashPassword(password) {
    return _bcryptjs2.default.hashSync(password);
  },
  checkPassword(password) {
    return _bcryptjs2.default.compareSync(password, this.password);
  },
};

exports. default = _mongoose2.default.model('User', UserSchema);
