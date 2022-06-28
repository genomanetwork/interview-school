/* eslint-disable  new-cap */
import Sections from '../model/sections';

const ObjectId = require('mongoose').Types.ObjectId;

export function getSectionsConflicts(sections = []) {
  const enrolledAt = sections.filter(section => section.enrolled);
  if (!sections.length || !enrolledAt.length){
    return [];
  }

  const conflicts = [];

  for (let i=0; i< enrolledAt.length; i++){
    const enrolledSchedule = enrolledAt[i].schedule;
    sections.forEach(section => {
      if (section._id !== enrolledAt[i]._id) {
        const match = section.schedule.filter(sectionDay => {
          const result = enrolledSchedule.filter(enrolledDay => enrolledDay.weekDay === sectionDay.weekDay && (
            enrolledDay.startAt >= sectionDay.startAt && enrolledDay.startAt <= sectionDay.endAt
          ||
            enrolledDay.endAt >= sectionDay.startAt && enrolledDay.endAt <= sectionDay.endAt
          ));

          if (result.length) {
            return sectionDay;
          }
        });

        if (match.length) {
          conflicts.push(section._id);
        }
      }
      return;
    });
  }
  return conflicts;
}

export async function getSections(userId) {
  const queryResult = await Sections.aggregate([
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

  const conflictIds = getSectionsConflicts(queryResult);
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
