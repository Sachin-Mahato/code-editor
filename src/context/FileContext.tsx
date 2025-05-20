import React, { ReactNode, useState } from "react";
import { fileTreeContext } from "./fileTreeContext";

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

type cssFile = {
    fileId: string,
    fileName: string,
    language: string,
    content: string,
    isOpen: boolean,
}

const FileTreeContextProvider = ({ children }: { children: ReactNode }) => {
    const [fileInputValue, setFileInputValue] = useState("")
    const [isFileClickIcon, setIsFileClickIcon] = useState(false)
    const [isFileClick, setIsFileClick] = useState(false)
    const [fileList, setFileList] = useState<File[]>([]);
    const [editorVal, setEditorVal] = useState("");
    const [htmlFiles, setHtmlFiles] = useState<htmlFile[]>([]);
    const [cssFiles, setCssFiles] = useState<cssFile[]>([]);

    const generateUniqueId = () => crypto.randomUUID();
    const toggleFileIconClick = () => setIsFileClickIcon(prev => !prev)

    const toggleFileActiveState = (e: React.MouseEvent<HTMLDivElement>, name: string) => {
        e.stopPropagation()
        setFileList(prev => prev.map((ele) =>
            ele.fileName.toLowerCase().trim() === name.toLowerCase().trim() ? { ...ele, isOpen: !ele.isOpen } : { ...ele, isOpen: false }))

        setHtmlFiles(prev => prev.map((ele) =>
            ele.fileName.toLowerCase().trim() === name.toLowerCase().trim() ? { ...ele, isOpen: !ele.isOpen } : { ...ele, isOpen: false }))
        setCssFiles(prev => prev.map((ele) =>
            ele.fileName.toLowerCase().trim() === name.toLowerCase().trim() ? { ...ele, isOpen: !ele.isOpen } : { ...ele, isOpen: false }))
        setEditorVal("");
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFileInputValue(e.target.value.trim().toLowerCase());

    const addFileToList = (input: string) => {
        if (input.trim() && input.length > 1) {
            const inputVal = input.trim().toLocaleLowerCase();
            const dot = inputVal.lastIndexOf(".");
            const inputLang = inputVal.substring(dot + 1, inputVal.length);
            const value: File = {
                fileId: generateUniqueId(),
                fileName: inputVal,
                language: inputLang,
                content: "",
                isOpen: false,
            };
            setFileList((prev) => [...prev, value]);
            if (inputLang === "html") {
                const htmlData: htmlFile = {
                    fileId: generateUniqueId(),
                    fileName: inputVal,
                    language: inputLang,
                    content: "",
                    isOpen: false
                };
                setHtmlFiles(prev => [...prev, htmlData]);
            }
            if (inputLang === "css") {
                const cssData: cssFile = {
                    fileId: generateUniqueId(),
                    fileName: inputVal,
                    language: inputLang,
                    content: "",
                    isOpen: false
                };
                setCssFiles(prev => [...prev, cssData]);
            }
            setFileInputValue("");
        }
    };

    const editorHandleChange = (val: string | undefined, id: string, lang: string) => {
        if (val !== undefined) {
            setEditorVal(val);
            setFileList(prev => prev.map(ele => {
                if (ele.fileId === id) {
                    return { ...ele, content: val }
                }
                return ele;
            }));

            if (lang === "html") {
                setHtmlFiles(prev => prev.map(ele => ({ ...ele, content: val})))
            }

            if (lang === "css") {
                setCssFiles(prev => prev.map(f => ({...f, content: val})))
            }
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
                htmlFiles,
                cssFiles,
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
