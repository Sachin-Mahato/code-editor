import { FileAction } from "@/types/types";
import { useContext } from "react";
import FileDispatchContext from "./fileDispatcher";

export function useFileTreeDispatch(): React.Dispatch<FileAction> {
    const ctx = useContext(FileDispatchContext);
    if (!ctx)
        throw new Error("useFileTreeDispatch must be inside FileTreeProvider");
    return ctx;
}
