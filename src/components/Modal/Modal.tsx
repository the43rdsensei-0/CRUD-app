import { useState } from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

function Modal({ close, title }: { close: () => void; title: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
          <label htmlFor="name">
            Name
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label htmlFor="email">
            Email
            <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label htmlFor="phone">
            Phone
            <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>

          <div className={styles.btn_wrapper}>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
