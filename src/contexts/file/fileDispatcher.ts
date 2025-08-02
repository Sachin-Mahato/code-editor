import { FileAction } from "@/types/types";
import { createContext } from "react";

const FileDispatchContext = createContext<
    React.Dispatch<FileAction> | undefined
>(undefined);

export default FileDispatchContext;
