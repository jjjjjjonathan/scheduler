import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import 'components/InterviewerList.scss';
import PropTypes from 'prop-types';

const InterviewerList = (props) => {
  const { interviewers, value, onChange } = props;
  const parsedInterviewers = interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      setInterviewer={() => onChange(interviewer.id)}
      selected={interviewer.id === value}
      {...interviewer}
    />
  ));
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
