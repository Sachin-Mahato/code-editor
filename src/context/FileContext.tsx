import React, { ReactNode, useState } from "react";
import { fileTreeContext } from "./fileTreeContext";

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

const FileTreeContextProvider = ({ children }: { children: ReactNode }) => {
    const [fileInputValue, setFileInputValue] = useState("")
    const [isFileClickIcon, setIsFileClickIcon] = useState(false)
    const [isFileClick, setIsFileClick] = useState(false)
    const [fileList, setFileList] = useState<File[]>([]);
    const [editorVal, setEditorVal] = useState("");

    const generateUniqueId = () => crypto.randomUUID();
    const toggleFileIconClick = () => setIsFileClickIcon(prev => !prev)

    const toggleFileActiveState = (e: React.MouseEvent<HTMLDivElement>, name: string) => {
        e.stopPropagation()
        setFileList(prev => prev.map((ele) =>
            ele.fileName.toLowerCase().trim() === name.toLowerCase().trim() ? { ...ele, isActive: !ele.isActive } : { ...ele, isActive: false }))
    
        setEditorVal("");
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFileInputValue(e.target.value.trim().toLowerCase());

    const addFileToList = (input: string) => {
        if (input.trim() && input.length > 1) {
            const inputVal = input.trim().toLocaleLowerCase()
            const dot = inputVal.indexOf(".")
            const inputLang = inputVal.substring(dot + 1, inputVal.length)
            const value: File = {
                fileId: generateUniqueId(),
                fileName: inputVal,
                language: inputLang,
                content: "",
                isActive: false,
                linkedCSS: [],
            }
            setFileList((prev) => [...prev, value])
            setFileInputValue("")
        }
    };

    const editorHandleChange = (val: string | undefined, id: string) => {
        if (val !== undefined) {
            setEditorVal(val);
            setFileList(prev => prev.map(ele => {
                if (ele.fileId === id ) {
                    return { ...ele, content: val}
                }
                return ele;
            }));
        }
        // find style is exist or not in the html

        // const findHref = /<link[^>]*href="([^"]+\.css)"[^>]*>/;
        // const match = str.match(findHref)

    
 
    };

    const checkIfFileClicked = (name: string) =>
        fileList.some(file => file.fileName === name.toLowerCase().trim()) ? setIsFileClick(true) : setIsFileClick(false)

    return (
        <fileTreeContext.Provider
            value={{
                fileInputValue,
                fileList,
                isFileClickIcon,
                isFileClick,
                editorVal,
                checkIfFileClicked,
                handleFileInputChange,
                toggleFileIconClick,
                toggleFileActiveState,
                addFileToList,
                editorHandleChange,
            }}
        >
            {children}
        </fileTreeContext.Provider>
    );
};

export default FileTreeContextProvider;
