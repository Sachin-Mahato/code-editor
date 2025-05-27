import React, { ReactNode, useState } from "react";
import { fileTreeContext } from "./fileTreeContext";
import makeActiveByName from "../utils/utils";
import { cssFileType, FileType, htmlFileType } from "../types/types";

const FileTreeContextProvider = ({ children }: { children: ReactNode }) => {
    const [fileInputValue, setFileInputValue] = useState("")
    const [isFileClickIcon, setIsFileClickIcon] = useState(false)
    const [isFileClick, setIsFileClick] = useState(false)
    const [fileList, setFileList] = useState<FileType[]>([]);
    const [editorVal, setEditorVal] = useState("");
    const [htmlFiles, setHtmlFiles] = useState<htmlFileType[]>([]);
    const [cssFiles, setCssFiles] = useState<cssFileType[]>([]);

    const generateUniqueId = () => crypto.randomUUID();
    const toggleFileIconClick = () => setIsFileClickIcon(prev => !prev)

    const toggleFileActiveState = (e: React.MouseEvent<HTMLDivElement>, name: string) => {
        e.stopPropagation()
        setFileList(prev => makeActiveByName(prev, name))
        setHtmlFiles(prev => makeActiveByName(prev,name))
        setCssFiles(prev => makeActiveByName(prev,name))
        setEditorVal("");
    };

    const onTabClick = (e: React.MouseEvent<HTMLParagraphElement | null>): void => {
        const value = e.target as HTMLElement;
        const tabText = value.innerText;
        setFileList(prev => makeActiveByName(prev,tabText));
        setEditorVal("");
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFileInputValue(e.target.value.trim().toLowerCase());

    const addFileToList = (input: string) => {
        const name = input.trim().toLowerCase();

        if (name.length < 2) {
            return;
        }
        // extract extension
        const dot = name.lastIndexOf(".");
        const language = dot !== -1  ? name.slice(dot+1) : "";
        const newFile = {
            fileId: generateUniqueId(),
            fileName: name,
            language,
            content: "",
            isOpen: false,
        }

        setFileList(prev => [...prev, newFile]);

        if (language === "html") {
            setHtmlFiles((prev: htmlFileType[]) => [...prev, newFile]);
        } else if (language === "css") {
            setCssFiles((prev: cssFileType[]) => [...prev, newFile]);
        }

        setFileInputValue("");
    };

    function editorHandleChange(val: string | undefined, id: string, lang: string) {
        if (val !== undefined) {
            setEditorVal(val);
            const updater = (files: FileType[]) => files.map(file => 
            file.fileId === id ? { ...file, content: val } : file);
            setFileList(updater);

            if (lang === "html") {
                setHtmlFiles(prev => prev.map(ele => ({ ...ele, content: val })));
                // useDebounce(updateHtmlFileContent,500);
                // setHtmlFiles(updater);
            }

            if (lang === "css") {
                setCssFiles(prev => prev.map(f => ({ ...f, content: val })));
                // setCssFiles(updater);
            }
        }

    }



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
                onTabClick,
            }}
        >
            {children}
        </fileTreeContext.Provider>
    );
};

export default FileTreeContextProvider;
