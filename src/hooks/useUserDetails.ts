import Config from "@/config/config";
import React, { useEffect, useState } from "react";

type userDetailsType = {
    id: string;
    username: string;
    email: string;
};

export default function useUserDetails(
    token: string | null,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
) {
    const [userDetails, setUserDetails] = useState<userDetailsType | null>(
        null,
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            setUserDetails(null);
            setError(null);
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;
        const request = new Request(Config.me, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            signal: signal,
        });

        const getUserDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(request);
                if (!response.ok) {
                    throw new Error("Failed to fetch user details");
                }
                const data = await response.json();
                setUserDetails(data);
                setIsAuthenticated(true);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                    setIsAuthenticated(false);
                    console.error(
                        "Error fetching user details:",
                        error.message,
                    );
                }
            } finally {
                setLoading(false);
            }
        };
        getUserDetails();

        return () => controller.abort();
    }, [token, setIsAuthenticated]);

    return { userDetails, loading, error };
}
