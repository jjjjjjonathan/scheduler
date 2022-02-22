import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { selected, spots, name, setDay } = props;
  const classes = classNames('day-list__item', { 'day-list__item--selected': selected, 'day-list__item--full': spots === 0 });
  const formatSpots = num => {
    if (num === 0) {
      return 'no spots remaining';
    } else if (num === 1) {
      return '1 spot remaining';
    } else {
      return `${num} spots remaining`;
    }
  };
  return (
    <li onClick={() => setDay(name)} className={classes}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
