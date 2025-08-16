import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import filesService from "@/features/fileExplorer/service/filesService";
import { mapApiFilesResponse } from "@/core/utils/utils";

export default function useFile(token: string) {
    const query = useQuery({
        queryKey: ["fileService", token],
        queryFn: () => filesService(token),
        enabled: !!token,
        gcTime: 1000 * 60 * 10,
        staleTime: 1000 * 60, // data considered fresh for 30s
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
