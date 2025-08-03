import { createContext } from "react";
import { FileType } from "@/types/types";

export interface FileTreeContextType {
    // State
    fileList: FileType[];
    editorVal: string;

}

export const FileContext = createContext<FileTreeContextType | null>(null);
