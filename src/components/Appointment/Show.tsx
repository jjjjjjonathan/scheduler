import React, { MouseEventHandler } from 'react';

type Interviewer = {
  id: number;
  name: string;
  avatar: string;
};

type ShowProps = {
  student: string;
  interviewer: Interviewer;
  onEdit: MouseEventHandler;
  onDelete: Function;
  id: number;
};

export default ({ student, interviewer, onEdit, onDelete, id }: ShowProps) => {
  return (
    <main className='appointment__card appointment__card--show'>
      <section className='appointment__card-left'>
        <h2 className='text--regular'>{student}</h2>
        <section className='interviewer'>
          <h4 className='text--light'>Interviewer</h4>
          <h3 className='text--regular'>{interviewer.name}</h3>
        </section>
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <img
            className='appointment__actions-button'
            src='images/edit.png'
            alt='Edit'
            onClick={onEdit}
          />
          <img
            className='appointment__actions-button'
            src='images/trash.png'
            alt='Delete'
            onClick={() => onDelete(id)}
          />
        </section>
      </section>
    </main>
  );
};
