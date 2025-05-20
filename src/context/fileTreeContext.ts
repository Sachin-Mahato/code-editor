import React, { createContext } from "react";


type File = {
    fileId: string,
    fileName: string,
    language: string,
    content: string,
    isOpen: boolean,
}
type htmlFile = {
    fileId: string,
    fileName: string,
    language: string,
    content: string,
    isOpen: boolean,
}

type cssFile =  {
    fileId: string,
    fileName: string,
    language: string,
    content: string,
    isOpen: boolean,
}



interface FileTreeContextType {
    fileInputValue: string;
    fileList: File[];
    isFileClickIcon: boolean;
    isFileClick: boolean;
    editorVal: string;
    htmlFiles: htmlFile[];
    cssFiles: cssFile[];
    handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checkIfFileClicked: (name: string) => void;
    toggleFileIconClick: () => void;
    addFileToList: (input: string) => void;
    toggleFileActiveState: (e:React.MouseEvent<HTMLDivElement>, name: string) => void;
    editorHandleChange: (val: string | undefined, id: string, lang: string) => void;
}

export const fileTreeContext = createContext<FileTreeContextType | null>(null)
