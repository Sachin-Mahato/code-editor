import AuthContext from "./authContext";

export default function AuthProvider({ children }) {

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}