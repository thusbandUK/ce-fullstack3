//import clsx from 'clsx';
import styles from './button.module.css'


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={styles.button}
    >
      {children}
    </button>
  );
}
