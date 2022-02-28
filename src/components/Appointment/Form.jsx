import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default (props) => {
  const {
    student: studentProp,
    interviewer: interviewerProp,
    interviewers,
    onSave,
    onCancel,
  } = props;
  const [student, setStudent] = useState(studentProp || '');
  const [interviewer, setInterviewer] = useState(interviewerProp || null);

  const reset = () => {
    setStudent('');
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const submit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={submit}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => onSave(student, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};
