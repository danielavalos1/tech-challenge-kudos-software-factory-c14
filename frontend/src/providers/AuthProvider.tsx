import { AuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import AuthService from "../services/auth";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }
    return null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (token) {
      return true;
    }
    return false;
  });
  const [user, setUser] = useState<{
    id: number;
    email: string;
    name: string;
    age: number;
    role: "user" | "admin";
    createdAt: string;
    updatedAt: string;
  } | null>(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  });

  const upToLocalStorage = (
    token: string,
    user: {
      id: number;
      email: string;
      name: string;
      age: number;
      role: "user" | "admin";
      createdAt: string;
      updatedAt: string;
    }
  ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const login = async (email: string, password: string) => {
    const { data, token } = await AuthService.login(email, password);
    upToLocalStorage(token, data);
    setUser(data);
    setToken(token);
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    age: number,
    role: string
  ) => {
    const { data, token } = await AuthService.signup(
      email,
      password,
      name,
      age,
      role
    );
    upToLocalStorage(token, data);
    setUser(data);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  //TODO: guardar token en sessionStorage para persistir la sesión del usuario al recargar la página.
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
