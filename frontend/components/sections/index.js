import React from 'react';
import {connect} from 'react-redux';
import SectionItem from './item';

const Sections = ({
  sections
}) => {
  const items = sections.map(section => <SectionItem key={section._id} section={section} />);
  return (
    <div className="sections">
      {items}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    sections: state.sections
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sections);
