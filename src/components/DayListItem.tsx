import React from 'react';
import classNames from 'classnames';
import './DayListItem.scss';
import { DayListItemProps } from '../helpers/propTypes';

export default ({ selected, spots, dayName, setDay }: DayListItemProps) => {
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0,
  });
  const formatSpots = (num: number) => {
    if (num === 0) {
      return 'no spots remaining';
    } else if (num === 1) {
      return '1 spot remaining';
    } else {
      return `${num} spots remaining`;
    }
  };
  return (
    <li onClick={setDay} className={dayClass} data-testid='day'>
      <h2 className='text--regular'>{dayName}</h2>
      <h3 className='text--light'>{formatSpots(spots)}</h3>
    </li>
  );
};
