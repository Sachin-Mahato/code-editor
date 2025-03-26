import { createContext } from "react";

interface FileTreeContextType {
    inputValues: string;
    inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileNames: string[];
    isFileClick: boolean,
    handleFileClick: () => void;
    handleFileNames: (input: string) => void;
}

export const fileTreeContext = createContext<FileTreeContextType | null>(null)
