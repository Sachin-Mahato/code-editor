import { useContext } from "react";
import { FileContext } from "./fileContext";

const useFileContext = () => {
    const context = useContext(FileContext);

    if (!context)
        throw new Error("File tree context must be within a provider");

    return context;
};

export default useFileContext;
