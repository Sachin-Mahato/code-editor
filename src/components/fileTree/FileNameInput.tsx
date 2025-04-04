import React from "react";
import useFileContext from "../../hooks/useFileContext";

const FileNameInput = () => {
    const { fileInputValue, handleFileInputChange, addFileToList, toggleFileIconClick } = useFileContext()

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            addFileToList(fileInputValue)
            toggleFileIconClick()
        }
    }

    return (
        <section className="max-w-full">
            <input
                autoFocus
                type="text"
                value={fileInputValue}
                className="focus:outline-sky-600 border-none outline-1  text-white"
                onChange={handleFileInputChange}
                onKeyDown={onEnter}
            />
        </section>
    );
};

export default FileNameInput;
