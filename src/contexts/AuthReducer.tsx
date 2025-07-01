import { Auth } from "@/interfaces/Auth";

export interface AuthState {
  auth: Auth | null;
  status: "authenticated" | "non-authenticated" | "checking";
}

export type AuthAction =
  | { type: "auth"; payload: { auth: Auth } }
  | { type: "logout" }
  | { type: "non-authenticated" }
  | { type: "updateAuth"; payload: { auth: Auth } };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "auth":
      return {
        ...state,
        auth: action.payload.auth,
        status: "authenticated",
      };
    case "logout":
      return {
        ...state,
        auth: null,
        status: "non-authenticated",
      };

    case "non-authenticated":
      return {
        ...state,
        auth: null,
        status: "non-authenticated",
      };
    case "updateAuth":
      return {
        ...state,
        status: "authenticated",
        auth: {
          ...action.payload.auth,
        },
      };

    default:
      return state;
  }
};
