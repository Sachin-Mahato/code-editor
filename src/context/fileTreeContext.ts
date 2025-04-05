import React, { createContext } from "react";

type File = {
    id: string,
    name: string
}

type ActiveFile = {
    id: string,
    name: string,
    isActive: boolean,
    text: string,
    row: number,
}

interface FileTreeContextType {
    fileInputValue: string;
    fileList: File[];
    isFileClickIcon: boolean;
    activeFiles: ActiveFile[];
    isFileClick: boolean;
    handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checkIfFileClicked: (name: string) => void;
    toggleFileIconClick: () => void;
    addFileToList: (input: string) => void;
    toggleFileActiveState: ( name: string) => void;
    handleFileContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>, id: string) => void
    handleTextareaSize :( e: React.KeyboardEvent<HTMLTextAreaElement>,id:string) => void 
}

export const fileTreeContext = createContext<FileTreeContextType | null>(null)
