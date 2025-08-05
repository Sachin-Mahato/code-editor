import { useState } from "react";
import { useNavigate } from "react-router";
import Config from "@/core/config/config";
import { registerUser } from "@/features/auth/services/authService";

export default function useSignup() {
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({
        name: false,
        email: false,
    });
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

        setValidationErrors({
            name: !isNameValid,
            email: !isEmailValid,
        });

        if (!isEmailValid || !isNameValid) return;

        setIsLoading(true);
        try {
            await registerUser(Config.registerUrl, username, email, password);
            navigate("/login");
        } catch (err) {
            console.error(err instanceof Error ? err.message : String(err));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        validationErrors,
        handleSubmit,
        validateEmail,
        validateName,
    };
}
