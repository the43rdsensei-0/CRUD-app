import styles from "./Input.module.css";

type InputType = {
  label: string;
  action: (e: string) => void;
  value: string;
};

function Input({ label, action, value }: InputType) {
  return (
    <div className={styles.input_wrapper}>
      <label htmlFor="input" className={styles.label}>
        {label}
      </label>
      <input className={styles.input} type="text" id="input" onChange={(e) => action(e.target.value)} value={value} />
    </div>
  );
}

export default Input;
