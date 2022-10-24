import React from 'react';
import Button from '../Button';
import { ConfirmProps } from '../../helpers/propTypes';

export default ({ message, onConfirm, onCancel, id }: ConfirmProps) => {
  return (
    <main className='appointment__card appointment__card--confirm'>
      <h1 className='text--semi-bold'>{message}</h1>
      <section className='appointment__actions'>
        <Button danger onClick={onCancel} disabled={false} confirm={false}>
          Cancel
        </Button>
        <Button
          danger
          onClick={() => onConfirm(id)}
          disabled={false}
          confirm={false}
        >
          Confirm
        </Button>
      </section>
    </main>
  );
};
