import React from 'react';
import DayListItem from './DayListItem';
import { DayListProps } from '../helpers/propTypes';

export default ({ days, onChange, value }: DayListProps) => {
  const parsedDays = days.map((day) => (
    <DayListItem
      key={day.id}
      dayName={value}
      setDay={() => onChange(day.name)}
      selected={value === day.name}
      {...day}
    />
  ));
  return <ul>{parsedDays}</ul>;
};
