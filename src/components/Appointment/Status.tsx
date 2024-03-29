import React from 'react';
import { StatusProps } from '../../helpers/propTypes';

export default ({ message }: StatusProps) => {
  return (
    <main className='appointment__card appointment__card--status'>
      <img
        className='appointment__status-image'
        src='images/status.png'
        alt='Loading'
      />
      <h1 className='text--semi-bold'>{message}</h1>
    </main>
  );
};
