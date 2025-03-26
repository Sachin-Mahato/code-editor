import { createContext } from "react";

interface FileTreeContextType {
    inputValues: string;
    inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileNames: string[];
    isFileClickIcon: boolean;
    isFileClick: boolean;
    clickedFile: (name: string) => void;
    handleFileClick: () => void;
    handleFileNames: (input: string) => void;
}

export const fileTreeContext = createContext<FileTreeContextType | null>(null)
