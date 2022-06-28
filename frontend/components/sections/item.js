import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {enroll, unroll} from './actions';
import actionTypes from '../../store/actionTypes';

const SectionItem = ({
  section
}) => {
  const dispatch = useDispatch();
  const {_id, subject, teacher, enrolled, classroom, schedule, conflict} = section;
  const days = schedule.map(day => day.weekDay.substring(0,3)).join(', ');

  const [waiting, setWaiting] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(enrolled);

  const userEnroll = useCallback(async () => {
    setWaiting(true);
    await enroll(_id);
    dispatch({type: actionTypes.USER_ENROLLED, sectionId: _id});
    setIsEnrolled(true);
    setWaiting(false);
  }, [waiting]);

  const userUnroll = useCallback(async () => {
    setWaiting(true);
    await unroll(_id);
    dispatch({type: actionTypes.USER_UNROLLED, sectionId: _id});
    setIsEnrolled(false);
    setWaiting(false);
  }, [waiting]);

  return (
    <div className="sections__item">
      <h2 className="sections__item__title">{subject}</h2>
      <p><strong>Teacher</strong>: {teacher}</p>
      <p><strong>Classroom</strong>: {classroom}</p>
      <p><strong>Days</strong>: {days}</p>
      <p><strong>Start at</strong>: {schedule[0].startAt}</p>
      <p><strong>End at</strong>: {schedule[0].endAt}</p>

      <div className="sections__item__button-container">
        {waiting ?
          <button type="button" className="btn btn--disabled" disabled>Processing ...</button>
          : isEnrolled ?
            <button type="button" className="btn btn--secondary" onClick={userUnroll}>Unroll</button>
            : conflict ?
              <button type="button" className="btn btn--disabled" disabled>Schedule conflict</button>
              : <button type="button" className="btn btn--primary" onClick={userEnroll}>Enroll</button>
        }
      </div>
    </div>
  );
};

export default SectionItem;
