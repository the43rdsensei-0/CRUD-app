import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import AppLayout from "./pages/AppLayout/AppLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import { useEffect, useReducer } from "react";
import Signup from "./pages/Signup/Signup";

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

function App() {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <Routes>
        <Route index path={"/"} element={<Login user={FAKE_USER} isAuthenticated={isAuthenticated} dispatch={dispatch} />} />
        <Route index path={"signup"} element={<Signup />} />
        <Route
          path={"app"}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AppLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
