import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, isAuthenticated }) {
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return children;
}

export default ProtectedRoute;
