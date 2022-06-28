'use strict';
import mongoose from 'mongoose';
import {emailFormat} from '../../../utils/regularExpresions';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bcrypt = require('bcryptjs');

const genderEnum = ['male', 'female'];
const typeEnum = ['teacher','student'];
const statusConnectionEnum = ['offline', 'online', 'iddle'];
const statusEnum = ['active', 'banned', 'deleted'];

const schema = new Schema({
  id: ObjectId,
  name: {type: String, required: true},
  lastname: {type: String, required: true},
  username: {type: String, maxlenght : [50, 'USERNAME lenght cannot be higher than 50 chars!']},
  gender: {type: String, required: true, enum: {values: genderEnum, message: 'DB ::: gender invalid value!'}, default: 'male'},
  connection: {type: String, enum: {values: statusConnectionEnum, message: 'DB ::: connection invalid value!'}, default: 'offline'},
  sections:  [{type: Schema.Types.ObjectId, ref: 'sections'}],
  status: {type: String, enum: {values: statusEnum}, default: 'active'},
  type: {type: String, enum: {values: typeEnum}, default: 'student'},
  sensitive: {
    email: {type: String, required: true, match: emailFormat},
    password: {type: String, required: true}
  },
  audit: {
    creationDate: {type: Date, required: true, default: Date.now}
  }
});

schema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

schema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.sensitive.password);
};

module.exports = mongoose.model('users', schema);
