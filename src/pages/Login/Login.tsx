import { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

function Login({ user, isAuthenticated, dispatch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function login(username, password) {
    if (username === user.username && password === user.password) dispatch({ type: "login", payload: user });
  }

  // function logout() {
  //   dispatch({ type: "logout" }); // logout functionality (LATER)
  // }

  function handleSubmit(e) {
    e.preventDefault();

    if (username && password) {
      login(username, password);
    }
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app");
    },
    [isAuthenticated, navigate]
  );

  return (
    <div className={styles.login_container}>
      <form action="" className={styles.login_form} onSubmit={(e) => handleSubmit(e)}>
        <Input label="username" action={setUsername} value={username} />
        <Input label="password" action={setPassword} value={password} />

        <div className={styles.btn_login}>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
