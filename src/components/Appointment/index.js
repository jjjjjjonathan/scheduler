import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const Appointment = props => {
  const { time, interview } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show {...interview} />}
      {mode === CREATE && <Form interviewers={[]} onCancel={() => back()} />}
    </article>
  );
};

export default Appointment;