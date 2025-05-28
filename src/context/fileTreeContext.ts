import React, { createContext } from "react";
import { cssFileType, FileType, htmlFileType } from "../types/types";

interface FileTreeContextType {
    fileInputValue: string;
    fileList: FileType[];
    isFileClickIcon: boolean;
    isFileClick: boolean;
    editorVal: string;
    htmlFiles: htmlFileType[];
    cssFiles: cssFileType[];
    tabs: FileType[];
    handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checkIfFileClicked: (name: string) => void;
    toggleFileIconClick: () => void;
    addFileToList: (input: string) => void;
    toggleFileActiveState: (e:React.MouseEvent<HTMLDivElement>, name: string) => void;
    editorHandleChange: (val: string | undefined, id: string, lang: string) => void;
    onTabClick: (e:React.MouseEvent<HTMLParagraphElement>) => void;
    tabCloseHandler: (name:string) => void
}

export const fileTreeContext = createContext<FileTreeContextType | null>(null)