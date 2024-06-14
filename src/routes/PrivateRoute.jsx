import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = UserAuth();

  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
