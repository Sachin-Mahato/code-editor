import Config from "@/config/config";
import { useCallback, useEffect, useState } from "react";

type userDetailsType = {
    id: string;
    username: string;
    email: string;
};

export default function useUserDetails(
    token: string | null,
    isAuthenticated: boolean | null,
) {
    const [userDetails, setUserDetails] = useState<userDetailsType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getUserDetails = useCallback(
        async (signal: AbortSignal) => {
            if (!token || !isAuthenticated) return;

            setLoading(true);
            setError(null);
            try {
                const response = await fetch(Config.me, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    signal: signal,
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user details");
                }
                const data = await response.json();
                setUserDetails(() => [data]);
            } catch (error) {
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError"
                ) {
                    console.log("Fetch aborted");
                } else if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        },
        [token, isAuthenticated],
    );

    useEffect(() => {
        const controller = new AbortController();
        getUserDetails(controller.signal);
        return () => controller.abort();
    }, []);

    return { userDetails, loading, error };
}
