import { useContext } from "react";
import { fileTreeContext } from "../context/fileTreeContext";

const useFileContext = () => {
    const context = useContext(fileTreeContext)

    if (!context) throw new Error("File tree context must be within a provider")
    
    return context;
}

export default useFileContext;