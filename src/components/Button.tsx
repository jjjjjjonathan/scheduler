import React from 'react';
import classNames from 'classnames';
import './Button.scss';
import { ButtonProps } from '../helpers/propTypes';

export default ({
  onClick,
  confirm,
  danger,
  disabled,
  children,
}: ButtonProps) => {
  const btnClass = classNames('button', {
    'button--confirm': confirm,
    'button--danger': danger,
  });
  return (
    <button className={btnClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
