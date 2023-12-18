import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import styles from "./Signup.module.css";
import Loader from "../../components/loader/Loader";

function Options(methodType: string, payload: string) {
  return {
    method: methodType,
    body: payload,
  };
}

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const userData = JSON.stringify({
    email,
    username,
    password,
  });

  useEffect(() => {
    if (!username || !password) return;

    if (formSubmitted) {
      setIsLoading(true);

      fetch("https://crud-api-s9wj.onrender.com/signup", Options("POST", userData))
        .then((response) => {
          if (!response.ok) throw new Error("error fetching data");

          return response.json();
        })
        .then((data) => {
          console.log(data);

          navigate("/");
        })
        .catch((error) => console.log("error", error))
        .finally(() => setIsLoading(false));
    }
  }, [password, username, email, userData, navigate, formSubmitted]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (username && password) {
      setFormSubmitted(true);
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className={styles.login}>
          <div className={styles.form_container}>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <div className={styles.row}>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>

              <div className={styles.row}>
                <label htmlFor="username">Username</label>
                <input type="username" id="username" onChange={(e) => setUsername(e.target.value)} value={username} />
              </div>

              <div className={styles.row}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>

              <div>
                <Button type={"primary"}>Sign up</Button>
              </div>
            </form>
          </div>
        </main>
      )}
    </>
  );
}

export default Signup;
