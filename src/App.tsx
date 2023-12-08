import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import AppLayout from "./pages/AppLayout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"login"} element={<Login />} />
        <Route path={"app"} element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
