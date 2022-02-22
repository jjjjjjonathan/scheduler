import React, { useState } from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected } = props;
  const [interviewer, setInterviewer] = useState("");
  const classes = classNames('intervierwers__item', { 'interviewers__item--selected': selected });
  return (
    <li key={id} className={classes} onClick={() => setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected ? `${name}` : ''}
    </li>
  );
}