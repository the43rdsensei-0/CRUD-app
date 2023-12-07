import { useState } from "react";
import Input from "../Input/Input";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

function Modal({ close, title }: { close: () => void; title: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
  }

  return (
    <div className={styles.modal_container}>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h3>{title}</h3>
          <button className={styles.close} onClick={close}>
            &times;
          </button>
        </div>

        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <Input label="Name" action={setName} value={name} />
          <Input label="email" action={setEmail} value={email} />
          <Input label="phone" action={setPhone} value={phone} />

          <div className={styles.btn_wrapper}>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
