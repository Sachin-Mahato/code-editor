import { createContext } from "react";
import { FileType } from "@/types/types";

export interface FileContextType {
    // State
    fileList: FileType[];
    editorVal: string;
}

export const FileContext = createContext<FileContextType>(
    {} as FileContextType,
);
