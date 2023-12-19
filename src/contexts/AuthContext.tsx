import { createContext, useContext, useReducer } from "react";

type AuthState = {
  user: object | null | undefined;
  isAuthenticated: boolean | undefined;
  dispatch: React.Dispatch<{ type: string; payload?: object }>;
};

const AuthContext = createContext<AuthState | null>(null);

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state: object, action: { type: string; payload?: object }) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "signup":
      return {
        ...state,
        user: action.payload,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error("unknown action specified");
  }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={{ user, isAuthenticated, dispatch }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("AuthContext does not exist out AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
