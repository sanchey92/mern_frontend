import React, {FC} from "react";
import './Button.css'
import {Link} from "react-router-dom";

interface IButton {
  href?: string,
  to?: string,
  size?: string,
  inverse?: boolean
  danger?: boolean,
  type?: any,
  onClick?: () => void,
  disabled?: boolean,
}

const Button: FC<IButton> = (props) => {
  const {href, to, size, inverse, danger, type, onClick, disabled, children} = props

  if (href) {
    return (
      <a
        className={`button button--${size || 'default'} ${inverse &&
        'button--inverse'} ${danger && 'button--danger'}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        className={`button button--${size || 'default'} ${inverse &&
        'button--inverse'} ${danger && 'button--danger'}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${size || 'default'} ${inverse &&
      'button--inverse'} ${danger && 'button--danger'}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button