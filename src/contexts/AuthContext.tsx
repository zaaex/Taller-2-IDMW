"use client";

import { User } from "@/interfaces/User";
import { authReducer, AuthState } from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";
import { decodeJWT } from "@/helpers/decodeJWT";

type AuthContextProps = {
  user: User | null;
  status: "authenticated" | "non-authenticated" | "checking";
  auth: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
};

const authInitialState: AuthState = {
  status: "checking",
  user: null,
};

export const AuthContext = createContext({} as AuthContextProps);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch({ type: "non-authenticated" });
    } else {
      dispatch({ type: "auth", payload: { user: decodeJWT(token) } });
    }
  }, []);

  const auth = (user: User) => {
    dispatch({ type: "auth", payload: { user } });
  };
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "logout" });
  };

  const updateUser = (user: User) => {
    dispatch({ type: "updateUser", payload: { user } });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
        auth,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
