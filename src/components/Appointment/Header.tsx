import React from 'react';
import { HeaderProps } from '../../helpers/propTypes';

export default ({ time }: HeaderProps) => {
  return (
    <header className='appointment__time'>
      <h4 className='text--semi-bold'>{time}</h4>
      <hr className='appointment__separator' />
    </header>
  );
};
