import filesService from "@/service/filesService";
import { mapApiFilesResponse } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";

export default function useFile(token: string) {
    const { data, error, isLoading } = useQuery({
        queryKey: ["fileService", 1],
        queryFn: () => filesService(token),
        enabled: !!token,
        gcTime: 1000 * 60 * 10,
    });

    const transformedData = data ? mapApiFilesResponse(data) : null;
    return {
        data: transformedData,
        error,
        isLoading,
    };
}
