import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default (props) => {
   const btnClass = classNames('button', { 'button--confirm': props.confirm, 'button--danger': props.danger });
   return <button className={btnClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>;
}
