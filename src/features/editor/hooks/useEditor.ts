import { useQuery } from "@tanstack/react-query";
import editorService from "../service/editorService";

export default function useEditor(id: string, token: string) {
    const query = useQuery({
        queryKey: ["editorService", token],
        queryFn: () => editorService(id, token),
        enabled: !!token,
    });
}
