import React, { createContext } from "react";

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
    age: number,
    role: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: {
    id: number;
    email: string;
    name: string;
    age: number;
    role: "user" | "admin";
    createdAt: string;
    updatedAt: string;
  } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: number;
      email: string;
      name: string;
      age: number;
      role: "user" | "admin";
      createdAt: string;
      updatedAt: string;
    } | null>
  >;
}

export const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
});
