"use client";

import { Auth } from "@/interfaces/Auth";
import { authReducer, AuthState } from "./AuthReducer";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { decodeJWT } from "@/helpers/decodeJWT";

type AuthContextProps = {
  auth: Auth | null;
  status: "authenticated" | "non-authenticated" | "checking";
  login: (auth: Auth) => void;
  logout: () => void;
};

const authInitialState: AuthState = {
  status: "checking",
  auth: null,
};

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const login = (auth: Auth) => {
    dispatch({ type: "auth", payload: { auth } });
  };
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "logout" });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      logout();
      return;
    }

    try {
      const payload = decodeJWT(token);

      if (!payload) {
        logout();
        return;
      }

      const auth: Auth = {
        id: payload.nameid,
        email: payload.email,
        name: payload.given_name,
        role: payload.role,
      };

      login(auth);
    } catch (error) {
      console.error("Error decoding token payload, logging out", error);
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
