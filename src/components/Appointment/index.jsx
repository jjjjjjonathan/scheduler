import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';
import { getInterviewersForDay } from 'helpers/selectors';
import 'components/Appointment/styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

export default (props) => {
  const { time, interview, state, bookInterview, id } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    // console.log(interview);
    bookInterview(id, interview);
    // console.log(state.appointments[id]);
    transition(SHOW);
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show {...interview} />}
      {mode === CREATE && (
        <Form
          interviewers={getInterviewersForDay(state, state.day)}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
};
