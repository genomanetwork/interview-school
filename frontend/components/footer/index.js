import React, {useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {logout, printSchedule} from './actions';

const Footer = ({
  user
}) => {
  const [loggingOut, setLoggingOut] = useState(false);
  const [documentURL, setDocumentURL] = useState('');

  const printPdf = useCallback(async () => {
    await printSchedule();
    setDocumentURL(`/docs/${user}/mySchedule.pdf`);
  }, [documentURL]);


  const userLogout = useCallback(async () => {
    setLoggingOut(true);
    await logout();
    window.location.href = '/';
    return;
  }, [window]);

  return (
    <div className="footer">
      <div className="footer__btn-container">
        { documentURL ?
          <a href={documentURL} className="btn btn--primary" download>Download your schedule</a>
          :
          <button type="button" className="btn btn--primary" onClick={printPdf}>Create PDF with your schedule</button>
        }
        { loggingOut ?
          <button type="button" className="btn btn--disabled" disabled>Logging out ...</button>
          :
          <button type="button" className="btn btn--secondary" onClick={userLogout}>Logout</button>
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
