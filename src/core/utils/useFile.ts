import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import filesService from "@/features/fileExplorer/service/filesService";
import { mapApiFilesResponse } from "@/core/utils/utils";

export default function useFile(token: string) {
    const query = useQuery({
        queryKey: ["fileService", 1],
        queryFn: () => filesService(token),
        enabled: !!token,
        gcTime: 1000 * 60 * 10,
        // Hardening to avoid frequent focus-triggered refetches that can reset UI
        staleTime: 1000 * 30, // data considered fresh for 30s
        refetchOnWindowFocus: false,
    });

    const transformedData = useMemo(
        () => (query.data ? mapApiFilesResponse(query.data) : null),
        [query.data],
    );

    return {
        data: transformedData,
        error: query.error,
        isLoading: query.isLoading,
        dataUpdatedAt: query.dataUpdatedAt,
    };
}
