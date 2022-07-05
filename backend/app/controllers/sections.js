/* eslint-disable  new-cap */
import Sections from '../model/sections';
import getScheduleConflicts from '../../../utils/getScheduleConflicts';

const ObjectId = require('mongoose').Types.ObjectId;

export async function getSections(userId, enrolled = false) {
  const queryResult = await Sections.aggregate([
    {$match: enrolled ? {students: ObjectId(userId)} : {}},
    {$sort: {'audit.creationDate': 1}},
    {$lookup:{
      from:'users',
      localField:'teacher',
      foreignField:'_id',
      as:'teacher'
    }},
    {$unwind:'$teacher'},
    {$lookup:{
      from:'subjects',
      localField:'subject',
      foreignField:'_id',
      as:'subject'
    }},
    {$unwind:'$subject'},
    {$lookup:{
      from:'classrooms',
      localField:'classroom',
      foreignField:'_id',
      as:'classroom'
    }},
    {$unwind:'$classroom'},
    {$project: {
      teacher: {$concat: ['$teacher.name', ' ', '$teacher.lastname']},
      subject: '$subject.name',
      classroom: '$classroom.name',
      schedule: 1,
      enrolled: {
        $cond:[{$in:[ObjectId(userId), '$students']}, true, false]
      }
    }}
  ]);

  const enrolledAt = queryResult.filter(section => section.enrolled);

  if (enrolled) {
    return enrolledAt;
  }

  const conflictIds = getScheduleConflicts(queryResult,enrolledAt);
  const sections = queryResult.map(section => {
    section['conflict'] = conflictIds.indexOf(section._id) > -1;
    return section;
  });

  return sections;
}


export async function enroll(userId, sectionId) {
  return await Sections.findOneAndUpdate({_id: ObjectId(sectionId)},{
    $push: {students: ObjectId(userId)}
  });
}

export async function unroll(userId, sectionId) {
  return await Sections.findOneAndUpdate({_id: ObjectId(sectionId)},{
    $pull: {students: ObjectId(userId)}
  });
}
