import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';
import { getInterviewersForDay } from 'helpers/selectors';
import 'components/Appointment/styles.scss';
import Status from './Status';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFIRM = 'CONFIRM';
const DELETE = 'DELETE';
const EDIT = 'EDIT';

export default (props) => {
  const { time, interview, state, bookInterview, id, deleteInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    // console.log(interview);
    transition(SAVING);
    setTimeout(() => {
      bookInterview(id, interview);
      transition(SHOW);
    }, 2000);
  };

  const deleteAppt = () => transition(CONFIRM);
  const editAppt = () => transition(EDIT);

  const confirmDeleteAppt = (id) => {
    transition(DELETE);
    setTimeout(() => {
      deleteInterview(id);
      transition(EMPTY);
    }, 2000);
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show onDelete={deleteAppt} {...interview} id={id} onEdit={editAppt} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={getInterviewersForDay(state, state.day)}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={'Saving...'} />}
      {mode === CONFIRM && (
        <Confirm
          message={'Wanna delete?'}
          onConfirm={confirmDeleteAppt}
          id={id}
        />
      )}
      {mode === DELETE && <Status message={'Deleting...'} />}
      {mode === EDIT && (
        <Form
          interviewers={getInterviewersForDay(state, state.day)}
          onCancel={back}
          onSave={save}
          student={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}
    </article>
  );
};
