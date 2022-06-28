'use strict';
import mongoose from 'mongoose';
import {ipFormat} from '../../../utils/regularExpresions';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const statusEnum = ['draft', 'published', 'unpublished', 'archived'];

const schema = new Schema({
  id: ObjectId,
  name: {type: String, required: true},
  teacher: {type: Schema.Types.ObjectId, ref: 'users', required: true},
  substituteTeacherOne:  {type: Schema.Types.ObjectId, ref: 'users'},
  substituteTeacherTwo:  {type: Schema.Types.ObjectId, ref: 'users'},
  status: {type: String, enum: {values: statusEnum}, default: 'draft'},
  audit: {
    creationDate: {type: Date, required: true, default: Date.now},
    creationIp: {type: String, required: true, match: ipFormat}
  }
});

module.exports = mongoose.model('subjects', schema);
