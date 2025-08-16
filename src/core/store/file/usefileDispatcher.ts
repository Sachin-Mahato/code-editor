import { FileAction } from "@/features/fileExplorer/types/types";
import { useContext } from "react";
import FileDispatchContext from "./fileDispatcher";

export function useFileDispatch(): React.Dispatch<FileAction> {
    const ctx = useContext(FileDispatchContext);
    if (!ctx)
        throw new Error("useFileTreeDispatch must be inside FileTreeProvider");
    return ctx;
}
