import React from 'react';
import classNames from 'classnames';

import 'components/Button.scss';

export default (props) => {
  const { onClick, confirm, danger, disabled, children } = props;
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
