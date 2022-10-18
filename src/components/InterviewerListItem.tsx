import React, { MouseEventHandler } from 'react';
import 'components/InterviewerListItem.scss';
import classNames from 'classnames';

type InterviewerListItemProps = {
  name: string;
  avatar: string;
  selected: boolean;
  setInterviewer: MouseEventHandler;
};

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
