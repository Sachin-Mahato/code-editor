import { createContext } from "react";

interface FileTreeContextType {
    inputValues: string;
    inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileNames: string[];
    isFileClickIcon: boolean;
    isFileActive: Record<string, boolean>;
    isFileClick: boolean;
    clickedFile: (name: string) => void;
    handleFileIconClick: () => void;
    handleFileNames: (input: string) => void;
    handleFileActive: (e:React.MouseEvent, name: string) => void;
}

export const fileTreeContext = createContext<FileTreeContextType | null>(null)
