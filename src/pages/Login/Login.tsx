import { useState } from "react";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function Login({ user, isAuthenticated, dispatch }: { user: object; isAuthenticated: boolean }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  // function login(username: string, password: string) {
  //   if (username === user.username && password === user.password) dispatch({ type: "login", payload: user });
  // }

  // function logout() {
  //   dispatch({ type: "logout" }); // logout functionality (LATER)
  // }

  // function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();

  //   if (username && password) {
  //     login(username, password);
  //   }
  // }

  // useEffect(
  //   function () {
  //     if (isAuthenticated) navigate("/app");
  //   },
  //   [isAuthenticated, navigate]
  // );

  return (
    <main className={styles.login}>
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={() => {}}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" onChange={(e) => setUsername(e.target.value)} value={username} />
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
  );
}

export default Login;
