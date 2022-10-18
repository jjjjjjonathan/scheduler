import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import 'components/Button.scss';

type ButtonProps = {
  onClick: MouseEventHandler;
  confirm: Boolean;
  danger: Boolean;
  disabled: any;
  children: any;
};

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
