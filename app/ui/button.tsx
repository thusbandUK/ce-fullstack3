//import clsx from 'clsx';
import styles from './button.module.css'
import React from 'react';


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export function Button({ children, className, ...rest }: ButtonProps) {
  console.log(children);
  return (
    <button
      {...rest}
      className={styles.button}
    >
      {children}
    </button>
  );
}
