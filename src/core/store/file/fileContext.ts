import { createContext } from "react";
import { FileType } from "@/features/fileExplorer/types/types";

export interface FileContextType {
    // State
    fileList: FileType[];
    editorVal: string;
}

export const FileContext = createContext<FileContextType>(
    {} as FileContextType,
);
