import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss';

export default (props) => {
  const { selected, spots, name, setDay } = props;
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0,
  });
  const formatSpots = (num) => {
    if (num === 0) {
      return 'no spots remaining';
    } else if (num === 1) {
      return '1 spot remaining';
    } else {
      return `${num} spots remaining`;
    }
  };
  return (
    <li onClick={setDay} className={dayClass} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
};
