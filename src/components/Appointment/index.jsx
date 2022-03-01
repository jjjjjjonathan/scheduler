import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';
import 'components/Appointment/styles.scss';
import Status from './Status';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFIRM = 'CONFIRM';
const DELETE = 'DELETE';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default (props) => {
  const { time, interview, interviewers, bookInterview, id, deleteInterview } =
    props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    if (name && interviewer) {
      const interview = {
        student: name,
        interviewer,
      };
      transition(SAVING);
      bookInterview(id, interview)
        .then(() => transition(SHOW))
        .catch((error) => transition(ERROR_SAVE, true));
    } else transition(ERROR_SAVE);
  };

  const deleteAppt = () => transition(CONFIRM);
  const editAppt = () => transition(EDIT);

  const confirmDeleteAppt = (id) => {
    transition(DELETE, true);
    deleteInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show onDelete={deleteAppt} {...interview} id={id} onEdit={editAppt} />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
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
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
          student={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={'Cannot save the appointment'} onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={'Cannot delete the appointment'} onClose={back} />
      )}
    </article>
  );
};
