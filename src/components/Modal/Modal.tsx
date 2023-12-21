import { useEffect, useMemo, useState } from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

const ID = localStorage.getItem("userid");

function Modal({ close, title, methodType }: { close: () => void; title: string; methodType: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const data = useMemo(
    () => ({
      userid: ID,
      name,
      email,
      phone,
      dateCreated: new Date(),
    }),
    [name, email, phone]
  );

  useEffect(
    function () {
      if (formSubmitted) {
        setIsLoading(true);
        fetch("https://crud-api-s9wj.onrender.com/createinfo", {
          method: methodType,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) throw new Error("error creating data");

            return response.json();
          })
          .catch((error) => console.log(error.message))
          .finally(() => {
            setIsLoading(false);
            close();
          });
      }
    },
    [data, formSubmitted, methodType, close]
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (validate()) {
      setFormSubmitted(true);
    }
  }

  function validate() {
    let result = true;

    if (name === "" || name === null)
      if (email === "" || email === null) {
        result = false;
      }

    if (phone === "" || phone === null) {
      result = false;
    }

    return result;
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
            <Button disabled={isLoading} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
