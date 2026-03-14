import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  const navigate = useNavigate();

  if (loading) {
    return;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;