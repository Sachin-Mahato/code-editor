import { ReactNode, useState } from "react";
import { fileTreeContext } from "./fileTreeContext";

const FileTreeContextProvider = ({ children }: { children: ReactNode }) => {
    const [inputValues, setInputValues] = useState("")
    const [isFileClickIcon, setIsFileClickIcon] = useState(false)
    const [fileNames, setFileNames] = useState<string[]>([])
    const [isFileClick, setIsFileClick] = useState(false)

    const handleFileClick = () => setIsFileClickIcon(prev => !prev);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputValues(e.target.value.trim())

    const handleFileNames = (input: string) => {
        if (input.trim() && input.length > 0) {
            setFileNames((prev) => [...prev, input.trim()])
            setInputValues("")
        }
    };

    const clickedFile = (name: string) => fileNames.includes(name) ? setIsFileClick(true) : setIsFileClick(false)

    return (
        <fileTreeContext.Provider
            value={{
                inputValues,
                inputHandler,
                fileNames,
                isFileClickIcon,
                isFileClick,
                clickedFile,
                handleFileClick,
                handleFileNames,
            }}
        >
            {children}
        </fileTreeContext.Provider>
    );
};

export default FileTreeContextProvider;
