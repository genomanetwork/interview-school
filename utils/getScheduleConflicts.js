export default function (sections, enrolledAt) {
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
