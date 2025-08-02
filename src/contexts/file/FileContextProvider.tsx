import React, { useReducer, ReactNode, useMemo } from "react";
import { FileContext } from "./fileContext";
import fileReducer, { initialFileState } from "@/reducers/fileReducer";
import { FileTreeContextType } from "./fileContext";
import FileDispatchContext from "./fileDispatcher";

export const FileTreeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(fileReducer, initialFileState);

    const contextValue = useMemo<FileTreeContextType>(() => ({
        fileList: state.fileList
    }), [state.fileList]);



    return (
        <FileDispatchContext.Provider value={dispatch}>

            <FileContext.Provider value={contextValue}>
                {children}
            </FileContext.Provider>
        </FileDispatchContext.Provider>
    );
};

