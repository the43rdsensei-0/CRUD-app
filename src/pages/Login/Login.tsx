import { useEffect, useReducer, useState } from "react";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Johnny",
  email: "johnny@gmail.com",
  username: "johnnyohms",
  password: "jOhms",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("unknown action");
  }
}

function Login() {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function login(username, password) {
    if (username === FAKE_USER.username && password === FAKE_USER.password) dispatch({ type: "login", payload: FAKE_USER });
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
