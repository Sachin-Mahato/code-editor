import React, { createContext } from "react";

type Stylesheet = {
    stylesheetId: number,
    cssText: string,
}

type File = {
    fileId: string,
    fileName: string,
    language: string,
    content: string,
    isActive: boolean,
    linkedCSS: Stylesheet[],
}



interface FileTreeContextType {
    fileInputValue: string;
    fileList: File[];
    isFileClickIcon: boolean;
    isFileClick: boolean;
    editorVal: string;
    handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checkIfFileClicked: (name: string) => void;
    toggleFileIconClick: () => void;
    addFileToList: (input: string) => void;
    toggleFileActiveState: (e:React.MouseEvent<HTMLDivElement>, name: string) => void;
    editorHandleChange: (val: string | undefined, id: string) => void;
}

export const fileTreeContext = createContext<FileTreeContextType | null>(null)
