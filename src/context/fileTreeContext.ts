import { createContext } from "react";

type File = {
    id: string,
    name: string
}

type ActiveFile = {
    id: string,
    name: string,
    isActive: boolean
}

interface FileTreeContextType {
    fileInputValue: string;
    handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileList: File[];
    isFileClickIcon: boolean;
    activeFiles: ActiveFile[];
    isFileClick: boolean;
    checkIfFileClicked: (name: string) => void;
    toggleFileIconClick: () => void;
    addFileToList: (input: string) => void;
    toggleFileActiveState: ( name: string) => void;
}

export const fileTreeContext = createContext<FileTreeContextType | null>(null)
