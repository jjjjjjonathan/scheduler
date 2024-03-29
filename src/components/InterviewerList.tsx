import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss';
import PropTypes from 'prop-types';
import { InterviewerListProps } from '../helpers/propTypes';
import { Interviewer } from '../helpers/stateTypes';

const InterviewerList = ({
  interviewers,
  value,
  onChange,
}: InterviewerListProps) => {
  const parsedInterviewers = interviewers!.map((interviewer: Interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      setInterviewer={() => onChange(interviewer.id)}
      selected={interviewer.id === value}
      {...interviewer}
    />
  ));
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>{parsedInterviewers}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
