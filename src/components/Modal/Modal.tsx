import { useState } from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

function Modal({ close, title }: { close: () => void; title: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name, email, phone);
  }

  return (
    <div className={styles.modal_container}>
      <div className={styles.overlay} onClick={close}></div>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h3>{title}</h3>
          <button className={styles.close} onClick={close}>
            &times;
          </button>
        </div>

        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <input value={name} />
          <input value={email} />
          <input type="text" value={phone} />

          <div className={styles.btn_wrapper}>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
