import { FileAction } from "@/features/fileExplorer/types/types";
import { createContext } from "react";

const FileDispatchContext = createContext<React.Dispatch<FileAction> | null>(
    null,
);

export default FileDispatchContext;
