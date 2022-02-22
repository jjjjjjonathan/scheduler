import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, setDay } = props;
  const parsedDays = days.map(day => <DayListItem key={day.id} setDay={setDay} {...day} />);
  return (
    <ul>
      {parsedDays}
    </ul>
  );
}