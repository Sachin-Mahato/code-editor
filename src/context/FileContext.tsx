import React, { ReactNode, useEffect, useState } from "react";
import { fileTreeContext } from "./fileTreeContext";

type File = {
    id: string,
    name: string
}

type ActiveFile = {
    id: string,
    name: string,
    isActive: boolean
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
        setFileInputValue(e.target.value.trim().toLowerCase())

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

    const checkIfFileClicked = (name: string) => 
        fileList.some(file => file.name === name.toLowerCase().trim()) ? setIsFileClick(true) : setIsFileClick(false)

    useEffect(() => {
        setActiveFiles(() => fileList.map((ele) => ({ ...ele, isActive: false })))
    },[fileList])

    return (
        <fileTreeContext.Provider
            value={{
                fileInputValue,
                handleFileInputChange,
                fileList, 
                isFileClickIcon,
                isFileClick,
                checkIfFileClicked,
                activeFiles,
                toggleFileIconClick,      
                toggleFileActiveState,
                addFileToList,
            }}
        >
            {children}
        </fileTreeContext.Provider>
    );
};

export default FileTreeContextProvider;
