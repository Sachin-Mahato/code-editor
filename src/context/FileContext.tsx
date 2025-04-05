import React, { ReactNode, useEffect, useState } from "react";
import { fileTreeContext } from "./fileTreeContext";

type File = {
    id: string,
    name: string
}

type ActiveFile = {
    id: string,
    name: string,
    isActive: boolean,
    text: string,
    row: number
}

const FileTreeContextProvider = ({ children }: { children: ReactNode }) => {
    const [fileInputValue, setFileInputValue] = useState("")
    const [isFileClickIcon, setIsFileClickIcon] = useState(false)
    const [isFileClick, setIsFileClick] = useState(false)
    const [fileList, setFileList] = useState<File[]>([])
    const [activeFiles, setActiveFiles] = useState<ActiveFile[]>([])

    const generateUniqueId = crypto.randomUUID()

    const toggleFileIconClick = () => setIsFileClickIcon(prev => !prev)

    const toggleFileActiveState = (name: string) => {
        setActiveFiles(prev => prev.map((ele) => 
            ele.name.toLowerCase().trim() === name.toLowerCase().trim() ? {...ele, isActive: !ele.isActive} : {...ele, isActive:false}))
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFileInputValue(e.target.value.trim().toLowerCase());

    const handleFileContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>, id: string) => {
        const newContent = e.target.value;

        setActiveFiles(prev => 
            prev.map(file => 
                file.id === id ? { ...file, text: newContent } : file
            )
        );
    }

    const addFileToList = (input: string) => {
        if (input.trim() && input.length > 1) {
            const value = {
                id: generateUniqueId,
                name: input.toLowerCase().trim()
            }
            setFileList((prev) => [...prev, value])
            setFileInputValue("")
        }
    };

    const handleTextareaSize = (e: React.KeyboardEvent<HTMLTextAreaElement>,id:string) => {
         if(e.code === "Enter") {
            setActiveFiles(prev => 
                prev.map(file => 
                    file.id === id ? { ...file, row: file.row + 1 } : file
                )
            )
         } else if (e.code === "Tab") {
            e.preventDefault()
            const target = e.target as HTMLTextAreaElement;

            const start = target.selectionStart;
            const end = target.selectionEnd;

            // Insert 4 spaces at the cursor position
            target.value = target.value.substring(0, start) + "    " + target.value.substring(end);

            // Move the cursor to the right by 4 spaces
            target.selectionStart = target.selectionEnd = start + 4;
         }
    }
    const checkIfFileClicked = (name: string) => 
        fileList.some(file => file.name === name.toLowerCase().trim()) ? setIsFileClick(true) : setIsFileClick(false)

    useEffect(() => 
        setActiveFiles(() => fileList.map((ele) => ({ ...ele, isActive: false, text: "", row: 1})))
    ,[fileList])



    return (
        <fileTreeContext.Provider
            value={{
                fileInputValue,
                fileList, 
                isFileClickIcon,
                isFileClick,
                activeFiles,
                checkIfFileClicked,
                handleFileInputChange,
                toggleFileIconClick,      
                toggleFileActiveState,
                addFileToList,
                handleFileContentChange,
                handleTextareaSize,
            }}
        >
            {children}
        </fileTreeContext.Provider>
    );
};

export default FileTreeContextProvider;
