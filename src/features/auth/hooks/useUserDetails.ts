import getUserDetails from "@/features/auth/services/getUserDetailsService";
import { ApiUserDetails } from "@/features/fileExplorer/types/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

export default function useUserDetails(
    token: string | null,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
) {
    const { data, error, isLoading } = useQuery<ApiUserDetails, Error>({
        queryKey: ["userDetails", token],
        queryFn: () => getUserDetails(token),
        enabled: !!token,
        gcTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (token?.length) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [token, setIsAuthenticated]);
    return { data, error, isLoading };
}
