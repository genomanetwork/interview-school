import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {enroll, unroll} from './actions';
import actionTypes from '../../store/actionTypes';

const SectionItem = ({
  section
}) => {
  const dispatch = useDispatch();
  const [waiting, setWaiting] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const {_id, subject, teacher, enrolled, classroom, schedule, conflict} = section;
  const days = schedule.map(day => day.weekDay.substring(0,3)).join(', ');

  useEffect(() => {
    setIsEnrolled(enrolled);
  }, [enrolled]);

  const userEnroll = useCallback(async () => {
    setWaiting(true);
    await enroll(_id);
    dispatch({type: actionTypes.USER_ENROLLED, sectionId: _id});
    setWaiting(false);
  }, [waiting]);

  const userUnroll = useCallback(async () => {
    setWaiting(true);
    await unroll(_id);
    dispatch({type: actionTypes.USER_UNROLLED, sectionId: _id});
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
        {isEnrolled ?
          <button type="button" className="btn btn--secondary" onClick={userUnroll}>Unroll</button>
          : conflict ?
            <button type="button" className="btn btn--disabled" disabled>Schedule conflict</button>
            : (waiting ?
              <button type="button" className="btn btn--disabled" disabled>Processing ...</button>
              :
              <button type="button" className="btn btn--primary" onClick={userEnroll}>Enroll</button>
            )
        }
      </div>
    </div>
  );
};

export default SectionItem;
