import React, { ReactNode, useEffect, useState } from "react";
import { fileTreeContext } from "./fileTreeContext";

type fileNames = {
    id: string,
    name: string
}

type FileActive = {
    id: string,
    name: string,
    isActive: boolean
}

const FileTreeContextProvider = ({ children }: { children: ReactNode }) => {
    const [inputValues, setInputValues] = useState("")
    const [isFileClickIcon, setIsFileClickIcon] = useState(false)
    const [isFileClick, setIsFileClick] = useState(false)
    const [fileNames, setFileNames] = useState<fileNames[]>([])
    const [isFileActive, setIsFileActive] = useState<FileActive[]>([])

    const id = crypto.randomUUID()

    const handleFileIconClick = () => setIsFileClickIcon(prev => !prev)

    const handleFileActive = (name: string) => {
        setIsFileActive(prev => prev.map((ele) => 
            ele.name.toLowerCase().trim() === name.toLowerCase().trim() ? {...ele, isActive: !ele.isActive} : {...ele, isActive:false}))
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputValues(e.target.value.trim().toLowerCase())

    const handleFileNames = (input: string) => {
        if (input.trim() && input.length > 1) {
            const value = {
                id: id,
                name: input.toLowerCase().trim()
            }
            setFileNames((prev) => [...prev, value])
            setInputValues("")
        }
    };

    const clickedFile = (name: string) => 
        fileNames.some(file => file.name === name.toLowerCase().trim()) ? setIsFileClick(true) : setIsFileClick(false)

    useEffect(() => {
        setIsFileActive(() => fileNames.map((ele) => ({ ...ele, isActive: false })))
    },[fileNames])

    return (
        <fileTreeContext.Provider
            value={{
                inputValues,
                inputHandler,
                fileNames, 
                isFileClickIcon,
                isFileClick,
                clickedFile,
                isFileActive,
                handleFileActive,
                handleFileIconClick,
                handleFileNames,
            }}
        >
            {children}
        </fileTreeContext.Provider>
    );
};

export default FileTreeContextProvider;
