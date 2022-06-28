export default function (sections = [], enrolledAt = []) {
  if (!sections.length || !enrolledAt.length){
    return [];
  }

  try {
    const conflicts = [];

    for (let i=0; i< enrolledAt.length; i++){
      const enrolledSchedule = enrolledAt[i].schedule;
      sections.forEach(section => {
        if (section._id !== enrolledAt[i]._id) {
          const match = section.schedule.filter(sectionDay => {
            const result = enrolledSchedule.filter(enrolledDay => enrolledDay.weekDay === sectionDay.weekDay && (
              Date.parse(`01/01/2011 ${enrolledDay.startAt}`) >= Date.parse(`01/01/2011 ${sectionDay.startAt}`) && Date.parse(`01/01/2011 ${enrolledDay.startAt}`) <= Date.parse(`01/01/2011 ${sectionDay.endAt}`)
            ||
              Date.parse(`01/01/2011 ${enrolledDay.endAt}`) >= Date.parse(`01/01/2011 ${sectionDay.startAt}`) && Date.parse(`01/01/2011 ${enrolledDay.endAt}`) <= Date.parse(`01/01/2011 ${sectionDay.endAt}`)
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
  } catch (err) {
    console.error(err);
    return [];
  }
}
