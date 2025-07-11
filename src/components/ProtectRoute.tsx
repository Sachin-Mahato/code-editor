import React, { useEffect, type ReactNode } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router";

type ProtectedRouteProps = {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            {children}
        </>
    )
        ;
};

export default ProtectedRoute;