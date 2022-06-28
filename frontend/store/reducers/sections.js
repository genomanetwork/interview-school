import actionTypes from '../actionTypes';
import getScheduleConflicts from '../../../utils/getScheduleConflicts';

export default (state={}, action) => {
  switch (action.type){
    case actionTypes.USER_ENROLLED:{
      try {
        const targetSection = state.filter(section => section._id === action.sectionId)[0];

        if (!targetSection) {
          console.error(`There is not target section at ${actionTypes.USER_ENROLLED}`);
          return state;
        }

        const enrolledAt = state.filter(section => section.enrolled);
        enrolledAt.push(targetSection);

        const conflictIds = getScheduleConflicts(state, enrolledAt);

        const newState = state.map(section => {
          if (section._id === targetSection._id) {
            section.enrolled = true;
            return section;
          }

          section['conflict'] = conflictIds.indexOf(section._id) > -1;

          return section;
        });

        return newState;
      } catch (err) {
        console.error(err);
        return state;
      }
    }

    case actionTypes.USER_UNROLLED:{
      try {
        const targetSection = state.filter(section => section._id === action.sectionId)[0];

        if (!targetSection) {
          console.error(`There is not target section at ${actionTypes.USER_UNROLLED}`);
          return state;
        }

        const enrolledAt = state.filter(section => section.enrolled);
        const targetIndex = enrolledAt.indexOf(targetSection);

        if (targetIndex > -1) { // removing the target section from enrolled sections
          enrolledAt.splice(targetIndex, 1);
        }

        const conflictIds = getScheduleConflicts(state, enrolledAt);

        const newState = state.map(section => {
          if (section._id === targetSection._id) {
            section.enrolled = false;
            return section;
          }

          section['conflict'] = conflictIds.indexOf(section._id) > -1;

          return section;
        });

        return newState;
      } catch (err) {
        console.error(err);
        return state;
      }
    }
    default:
      return state;
  }
};
