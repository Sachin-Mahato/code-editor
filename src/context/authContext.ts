import { createContext } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>> 
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;