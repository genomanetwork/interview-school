'use strict';
import mongoose from 'mongoose';
import {ipFormat} from '../../../utils/regularExpresions';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
  id: ObjectId,
  name: {type: String, required: true},
  audit: {
    creationDate: {type: Date, required: true, default: Date.now},
    creationIp: {type: String, required: true, match: ipFormat}
  }
});

module.exports = mongoose.model('classrooms', schema);
