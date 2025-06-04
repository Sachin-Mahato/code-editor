import React, { ReactNode, useEffect, useState, useCallback } from "react";
import { fileTreeContext } from "./fileTreeContext";
import makeActiveByName, { debounce, updater } from "../utils/utils";
import { cssFileType, FileType, htmlFileType } from "../types/types";
import { generateUniqueId,htmlDefaultValue,fileDefaultValue,cssDefaultValue } from "../utils/utils";


const FileTreeContextProvider = ({ children }: { children: ReactNode }) => {
    const [fileInputValue, setFileInputValue] = useState("")
    const [isFileClickIcon, setIsFileClickIcon] = useState(false)
    const [isFileClick, setIsFileClick] = useState(false)
    const [fileList, setFileList] = useState<FileType[]>([...fileDefaultValue]);
    const [editorVal, setEditorVal] = useState("");
    const [htmlFiles, setHtmlFiles] = useState<htmlFileType[]>([...htmlDefaultValue]);
    const [cssFiles, setCssFiles] = useState<cssFileType[]>([...cssDefaultValue]);
    const [tabs, setTabs] = useState<FileType[]>(fileList);

    const toggleFileIconClick = () => setIsFileClickIcon(prev => !prev)

    const toggleFileActiveState = (e: React.MouseEvent<HTMLDivElement>, name: string) => {
        e.stopPropagation()
        setFileList(prev => makeActiveByName(prev, name))
        setHtmlFiles(prev => makeActiveByName(prev, name))
        setCssFiles(prev => makeActiveByName(prev, name))
        setEditorVal("");
    };


    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFileInputValue(e.target.value.trim().toLowerCase());

    const addFileToList = (input: string) => {
        const name = input.trim().toLowerCase();

        if (name.length < 2) {
            return;
        }
        // extract extension
        const dot = name.lastIndexOf(".");
        const language = dot !== -1 ? name.slice(dot + 1) : "";
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

    const debouncedHtmlUpdate = debounce((val: string) => {
        setHtmlFiles(prev => prev.map(ele => ({ ...ele, content: val })));
    }, 500);

    const debounceCssUpdate = debounce((val: string) => {
        setCssFiles(prev => prev.map(f => ({ ...f, content: val })));
    }, 500);



    const editorHandleChange = useCallback((val: string | undefined, id: string, lang: string) => {
        if (val !== undefined) {
            setEditorVal(val);
            setFileList(prev => updater(prev, id, val));

            if (lang === "html") {
                debouncedHtmlUpdate(val)
            }

            if (lang === "css") {
                debounceCssUpdate(val)
            }
        }

    }, [debouncedHtmlUpdate, debounceCssUpdate])


    const checkIfFileClicked = (name: string) =>
        fileList.some(file => file.fileName === name.toLowerCase().trim()) ? setIsFileClick(true) : setIsFileClick(false)

    const onTabClick = (e: React.MouseEvent<HTMLParagraphElement | null>): void => {
        const value = e.target as HTMLElement;
        const tabText = value.innerText;
        setFileList(prev => makeActiveByName(prev, tabText));
        setEditorVal("");
    }
    const tabCloseHandler = (name: string) => {
        setTabs(prev => prev.filter(f => name !== f.fileName));
    }

    useEffect(() => {
        // sync with fileList
        setTabs(fileList)
    }, [fileList])



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
                tabs,
                checkIfFileClicked,
                handleFileInputChange,
                toggleFileIconClick,
                toggleFileActiveState,
                addFileToList,
                editorHandleChange,
                onTabClick,
                tabCloseHandler,
            }}
        >
            {children}
        </fileTreeContext.Provider>
    );
};

export default FileTreeContextProvider;
