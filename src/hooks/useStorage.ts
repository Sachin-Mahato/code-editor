import { useCallback, useEffect, useState } from "react";

export default function useStorage() {
    const [token, setToken] = useState<string | null>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("token") || "";
        }
        return "";
    });

    useEffect(() => {
        if(token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    },[token])

    const saveToken = useCallback((newToken: string ) => {
        setToken(newToken);
    },[])

    return {token, saveToken};
}