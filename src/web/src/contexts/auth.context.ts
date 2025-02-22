import { createContext } from "react";

export interface AuthState {
    token: string | null,
    isAuthenticated: boolean
}
interface AuthContextType {
    auth: AuthState;
    login: (token: string) => void;
    logout: () => void;
  }
const authContext = createContext<AuthContextType | undefined>(undefined);

export default authContext;
