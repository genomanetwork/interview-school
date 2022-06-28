'use strict';
import mongoose from 'mongoose';
import {ipFormat} from '../../../utils/regularExpresions';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const scheduledDaysEnum = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const schema = new Schema({
  id: ObjectId,
  teacher: {type: Schema.Types.ObjectId, ref: 'users', required: true},
  subject: {type: Schema.Types.ObjectId, ref: 'subjects', required: true},
  classroom: {type: Schema.Types.ObjectId, ref: 'classrooms', required: true},
  students: [{type: Schema.Types.ObjectId, ref: 'users'}],
  schedule: [{type: {
    weekDay: {type: String, enum: {values: scheduledDaysEnum}},
    startAt: {type: String},
    endAt: {type: String}
  }}],
  audit: {
    creationDate: {type: Date, required: true, default: Date.now},
    creationIp: {type: String, required: true, match: ipFormat}
  }
});

module.exports = mongoose.model('sections', schema);
