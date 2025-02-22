import { ReactNode } from "react";



interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = (children : AuthProviderProps) => {
    return ({children})
}