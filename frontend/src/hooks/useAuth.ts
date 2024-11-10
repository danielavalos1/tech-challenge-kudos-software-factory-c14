import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { login, signup, isAuthenticated, token, user, logout } =
    useContext(AuthContext);
  return {
    login,
    signup,
    logout,
    isAuthenticated,
    token,
    user,
  };
};
