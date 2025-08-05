import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "@/features/auth/services/authService";
import useStorage from "@/core/utils/useStorage";
import Config from "@/core/config/config";

export default function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const { saveToken } = useStorage();
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailReg.test(email);
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
        email: string,
        password: string,
    ) => {
        e.preventDefault();

        if (isLoading) return;

        setIsLoading(true);
        try {
            const tokens = await loginUser(Config.loginUrl, email, password);
            saveToken(tokens);
            navigate("/");
        } catch (err) {
            console.error(err instanceof Error ? err.message : String(err));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleSubmit,
        validateEmail,
    };
}
