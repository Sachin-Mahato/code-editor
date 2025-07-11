import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "@/service/authService";
import useStorage from "@/hooks/useStorage";
import Config from "@/config/config";

export default function useLogin() {
    const [pending, setPending] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
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

        if (!pending) return;

        setIsSubmit(true);
        try {
            const token = await loginUser(Config.loginUrl, email, password);
            saveToken(token);
            navigate("/");
        } catch (err) {
            console.error(err instanceof Error ? err.message : err);
            setIsSubmit(false);
        }
    };

    return {
        pending,
        isSubmit,
        setIsSubmit,
        handleSubmit,
        validateEmail,
        setPending,
    };
}
