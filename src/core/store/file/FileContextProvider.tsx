import React, { useReducer, ReactNode, useMemo } from "react";
import { FileContext } from "./fileContext";
import fileReducer, { initialFileState } from "@/core/reducers/fileReducer";
import { FileContextType } from "./fileContext";
import FileDispatchContext from "./fileDispatcher";

export const FileContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(fileReducer, initialFileState);
    const memoFileState = useMemo<FileContextType>(() => ({
        fileList: state.fileList,
        openIds: state.openIds,
        active: state.active,
        editorContent: state.editorContent,
    }), [state.fileList, state.editorContent, state.openIds, state.active]);

    const memoDispatch = useMemo(() => dispatch, [])

    return (
        <FileDispatchContext.Provider value={memoDispatch}>

            <FileContext.Provider value={memoFileState}>
                {children}
            </FileContext.Provider>
        </FileDispatchContext.Provider>
    );
};

