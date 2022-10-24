import React from 'react';
import { EmptyProps } from '../../helpers/propTypes';

export default ({ onAdd }: EmptyProps) => {
  return (
    <main className='appointment__add'>
      <img
        className='appointment__add-button'
        src='images/add.png'
        alt='Add'
        onClick={onAdd}
      />
    </main>
  );
};
