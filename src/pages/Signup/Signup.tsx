import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import styles from "./Signup.module.css";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!username || !password) return; // guard clause to do nothing when there's no username or password inputted

    // if form is filled and cta btn clicked, display loading page, and psot form data to DB
    if (formSubmitted) {
      setIsLoading(true);

      fetch("https://crud-api-s9wj.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("error creating user"); //if fetch fails return the string in error

          return response.json();
        })
        .then((data) => {
          console.log(data);
          navigate("/"); // navigate to the login page for authentication and access to the app
        })
        .catch((error) => console.log("error", error))
        .finally(() => setIsLoading(false)); // disable loading screen
    }
  }, [password, username, email, navigate, formSubmitted]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // if inputs are validated then formsubmitted becomes true
    if (validate()) {
      setFormSubmitted(true);
    }
  }

  function validate() {
    let result = true;

    if (username === "" || username === null) {
      toast.warn("please enter Username");
      result = false;
    }

    if (email === "" || email === null) {
      result = false;
      toast.warning("Please enter Password");
    }

    if (password === "" || password === null) {
      result = false;
      toast.warning("Please enter Password");
    }

    // return true or false based on evalaution of conditions
    return result;
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
