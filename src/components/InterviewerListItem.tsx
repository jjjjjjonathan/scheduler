import React from 'react';
import './InterviewerListItem.scss';
import classNames from 'classnames';
import { InterviewerListItemProps } from '../helpers/propTypes';

export default ({
  name,
  avatar,
  selected,
  setInterviewer,
}: InterviewerListItemProps) => {
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
  });
  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img className='interviewers__item-image' src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};
