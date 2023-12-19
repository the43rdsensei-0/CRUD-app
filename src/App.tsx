import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import AppLayout from "./pages/AppLayout/AppLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import Signup from "./pages/Signup/Signup";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index path={"/"} element={<Login />} />
          <Route index path={"signup"} element={<Signup />} />
          <Route
            path={"app"}
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
