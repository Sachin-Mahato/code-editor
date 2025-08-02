import authContext from "@/contexts/authContext";
import { useContext } from "react";

export default function useAuth() {
    const context = useContext(authContext);

    if (!context) throw new Error("Auth context must be within a provider");
    return context;
}
