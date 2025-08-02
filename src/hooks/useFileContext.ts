import { useContext } from "react";
import { fileTreeContext } from "../context/fileContext";

const useFileContext = () => {
    const context = useContext(fileTreeContext);

    if (!context)
        throw new Error("File tree context must be within a provider");

    return context;
};

export default useFileContext;
