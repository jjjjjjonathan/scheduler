import React, { useState, MouseEventHandler, FormEvent } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

type Interviewer = {
  id: number;
  name: string;
  avatar: string;
};

type FormProps = {
  student: string;
  interviewers: [Interviewer];
  onSave: Function;
  onCancel: Function;
  interviewer?: number;
};

export default ({
  student: studentProp,
  interviewer: interviewerProp,
  interviewers,
  onSave,
  onCancel,
}: FormProps) => {
  const [student, setStudent] = useState(studentProp || '');
  const [interviewer, setInterviewer] = useState(interviewerProp || null);
  const [error, setError] = useState('');
  const reset = () => {
    setStudent('');
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
  };

  const validate = (student: string, interviewer: number | null) => {
    if (student === '' && !interviewer) {
      setError(
        'Student name cannot be blank and you also need to select an interviewer'
      );
      return;
    }
    if (student === '') {
      setError('Student name cannot be blank');
      return;
    }
    if (!interviewer) {
      setError('Please select an interviewer');
      return;
    }
    setError('');
    onSave(student, interviewer);
  };

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={submit}>
          <input
            className='appointment__create-input text--semi-bold'
            name='name'
            type='text'
            placeholder='Enter Student Name'
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid='student-name-input'
          />
        </form>
        <section className='appointment__validation'>{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={cancel} confirm={false} disabled={false}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={() => validate(student, interviewer)}
            disabled={false}
            danger={false}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};
