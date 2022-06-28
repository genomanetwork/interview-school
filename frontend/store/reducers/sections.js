import actionTypes from '../actionTypes';
import getScheduleConflicts from '../../../utils/getScheduleConflicts';

export default (state={}, action) => {
  switch (action.type){
    case actionTypes.USER_ENROLLED:{
      const targetSection = state.filter(section => section._id === action.sectionId);
      const conflictIds = getScheduleConflicts(state, targetSection);
      const newState = state.map(section => {

        if (section._id === targetSection._id) {
          section.enrolled = true;
          return section;
        }

        section['conflict'] = conflictIds.indexOf(section._id) > -1;
        return section;
      });

      return newState;
    }
    default:
      return state;
  }
};
