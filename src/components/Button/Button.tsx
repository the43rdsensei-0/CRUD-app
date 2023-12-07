import { ReactElement } from "react";
import styles from "./Button.module.css";

type ButtonType = {
  children: string;
  icon?: ReactElement | undefined;
  onClick?: () => void;
  type: string;
};

function Button({ children, icon, onClick, type }: ButtonType) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      <span className={styles.button_text}>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}

export default Button;

// NB: icon (svg) should be declared and passed into the Button prop as a ReactComponent
