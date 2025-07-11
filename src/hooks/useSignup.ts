import { useState } from "react";
import { useNavigate } from "react-router";
import Config from "@/config/config";
import { registerUser } from "@/service/authService";

export default function useSignup() {
    const [pending, setPending] = useState({
        isNameValid: false,
        isEmailValid: false,
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailReg.test(email);
    };

    const validateName = (name: string): boolean => {
        const nameReg = /^[A-Za-z][A-Za-z\s]*$/;
        return nameReg.test(name);
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
        username: string,
        email: string,
        password: string,
    ) => {
        e.preventDefault();
        const isEmailValid = validateEmail(email);
        const isNameValid = validateName(username);

        setPending({ isEmailValid, isNameValid });

        if (!isEmailValid || !isNameValid) return;

        setIsSubmit(true);
        try {
            await registerUser(Config.registerUrl, username, email, password);
            navigate("/login");
        } catch (err) {
            console.error(err instanceof Error ? err.message : err);
            setIsSubmit(false);
        }
    };

    return {
        pending,
        isSubmit,
        setPending,
        handleSubmit,
        validateEmail,
        validateName,
        setIsSubmit,
    };
}
