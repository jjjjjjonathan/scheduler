import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, onChange, value } = props;
  const parsedDays = days.map(day => (
    <DayListItem
      key={day.id}
      name={value}
      setDay={onChange}
      {...day}
    />
  ));
  return (
    <ul>
      {parsedDays}
    </ul>
  );
}