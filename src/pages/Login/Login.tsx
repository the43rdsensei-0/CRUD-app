import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, dispatch } = useAuth()!; // getting the authenticated variable and dispatch method from the useAuth hook in AuthContext

  useEffect(() => {
    if (!email || !password) return; // guard clause to do nothing when there's no username or password inputted

    // if form is filled and cta btn clicked, display loading page, and psot form data to DB
    if (formSubmitted) {
      setIsLoading(true);
      fetch(`https://crud-api-s9wj.onrender.com/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("error signing user in"); //if fetch fails return the string in error

          return response.json();
        })
        .then((data) => {
          // store userid in localstorage as long as user is logged for easy retrieval and use
          localStorage.setItem("user", JSON.stringify(data));

          //dispatch method triggers a login passing the response received and storing it in the user (in context) then navigate to app (protected)
          dispatch({ type: "login", payload: data });
          if (isAuthenticated) navigate("/app");
        })
        .catch((error) => console.log("error", error))
        .finally(() => setIsLoading(false)); // disable loading screen
    }
  }, [password, email, navigate, formSubmitted, isAuthenticated, dispatch]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // if inputs are validated then formsubmitted becomes true
    if (validate()) {
      setFormSubmitted(true);
    }
  }

  function validate() {
    let result = true;

    if (email === "" || email === null) {
      toast.warn("please enter Username");
      result = false;
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
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>

              <div className={styles.row}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>

              <div>
                <Button type={"primary"}>Login</Button>
              </div>
            </form>

            <div className={styles.redirect}>
              <p>
                No account yet? <Link to={"signup"}> Sign up</Link>
              </p>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Login;
