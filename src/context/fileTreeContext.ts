import { createContext } from "react";

type fileNames = {
    id: string,
    name: string
}

type FileActive = {
    id: string,
    name: string,
    isActive: boolean
}

interface FileTreeContextType {
    inputValues: string;
    inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileNames: fileNames[];
    isFileClickIcon: boolean;
    isFileActive: FileActive[];
    isFileClick: boolean;
    clickedFile: (name: string) => void;
    handleFileIconClick: () => void;
    handleFileNames: (input: string) => void;
    handleFileActive: ( name: string) => void;
}

export const fileTreeContext = createContext<FileTreeContextType | null>(null)
