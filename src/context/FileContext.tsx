import React, { ReactNode, useEffect, useState } from "react";
import { fileTreeContext } from "./fileTreeContext";

const FileTreeContextProvider = ({ children }: { children: ReactNode }) => {
    const [inputValues, setInputValues] = useState("")
    const [isFileClickIcon, setIsFileClickIcon] = useState(false)
    const [isFileClick, setIsFileClick] = useState(false)
    const [fileNames, setFileNames] = useState<string[]>([])
    const [isFileActive, setIsFileActive] = useState<Record<string, boolean>>({})

    const handleFileIconClick = () => setIsFileClickIcon(prev => !prev)

    const handleFileActive = (e: React.MouseEvent, name: string) => {
        const li = e.target as HTMLLIElement;

        if (li.innerText.toLowerCase().trim() === name.toLowerCase().trim()) {
            setIsFileActive(prevState =>
                Object.keys(prevState).reduce((acc, key) => ({
                    ...acc,
                    [key]: key === name.toLowerCase().trim(),
                }), {})
            );
        }
    };


    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputValues(e.target.value.trim())

    const handleFileNames = (input: string) => {
        if (input.trim() && input.length > 0) {
            setFileNames((prev) => [...prev, input.trim()])
            setInputValues("")
        }
    };

    const clickedFile = (name: string) => fileNames.includes(name) ? setIsFileClick(true) : setIsFileClick(false)

    useEffect(() => {
        setIsFileActive(() => Object.fromEntries(fileNames.map((key) => [key, false])));
    }, [fileNames]);

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
