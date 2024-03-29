import React, { useEffect } from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from '../../hooks/useVisualMode';
import './styles.scss';
import Status from './Status';
import { AppointmentProps } from '../../helpers/propTypes';
import { Interviewer } from '../../helpers/stateTypes';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFIRM = 'CONFIRM';
const DELETE = 'DELETE';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default ({
  time,
  interview,
  interviewers,
  bookInterview,
  id,
  deleteInterview,
}: AppointmentProps) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const appointmentId: number | undefined = id !== undefined ? id : undefined;

  const save = (name: string, interviewer: Interviewer) => {
    if (bookInterview) {
      const interview = {
        student: name,
        interviewer,
      };
      transition(SAVING);
      bookInterview(id, interview)
        .then(() => transition(SHOW))
        .catch((error: unknown) => transition(ERROR_SAVE, true));
    }
  };

  const deleteAppt = () => transition(CONFIRM);
  const editAppt = () => transition(EDIT);

  const confirmDeleteAppt = (id: number) => {
    if (deleteInterview) {
      transition(DELETE, true);
      deleteInterview(id)
        .then(() => transition(EMPTY))
        .catch((error: unknown) => transition(ERROR_DELETE, true));
    }
  };

  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, mode, transition]);

  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && (
        <Show
          onDelete={deleteAppt}
          {...interview}
          id={appointmentId}
          onEdit={editAppt}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
          student={interview ? interview.student : ''}
        />
      )}
      {mode === SAVING && <Status message={'Saving...'} />}
      {mode === CONFIRM && (
        <Confirm
          message={'Are you sure you want to delete this appointment?'}
          onConfirm={confirmDeleteAppt}
          id={id}
          onCancel={back}
        />
      )}
      {mode === DELETE && <Status message={'Deleting...'} />}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
          student={interview!.student}
          interviewer={interview!.interviewer.id}
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
