import { FileType } from "@/features/fileExplorer/types/types";
import { createContext } from "react";

export interface FileContextType {
    // State
    fileList: FileType[];
    openIds: string[];
    active: string;
    editorVal: string;
}

export const FileContext = createContext<FileContextType | null>(null);
