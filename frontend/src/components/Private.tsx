import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateProps {
  children: React.ReactNode;
}

export const Private: React.FC<PrivateProps> = ({ children }) => {
  const { isAuthenticated, token, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isAuthenticated, token, user);
    if (!isAuthenticated || !token || !user) {
      navigate("/login");
    }
  }, [isAuthenticated, token, user, navigate]);

  return <>{children}</>;
};
