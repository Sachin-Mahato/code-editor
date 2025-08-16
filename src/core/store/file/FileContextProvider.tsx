import React, { useReducer, ReactNode, useMemo, useEffect } from "react";
import { FileContext } from "./fileContext";
import fileReducer, { initialFileState } from "@/core/reducers/fileReducer";
import { FileContextType } from "./fileContext";
import FileDispatchContext from "./fileDispatcher";
import useFile from "@/core/utils/useFile";
import useStorage from "@/core/utils/useStorage";

export const FileContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(fileReducer, initialFileState);
    const { token } = useStorage()
    const { data } = useFile(token!)
    const memoFileState = useMemo<FileContextType>(() => ({
        fileList: state.fileList,
        active: state.active,
        editorContent: state.editorContent,
    }), [state.fileList, state.editorContent, state.active]);

    const memoDispatch = useMemo(() => dispatch, [])

    useEffect(() => {
        memoDispatch({ type: "ADD_FILE_FROM_API", payload: data! })
    }, [data, memoDispatch])

    return (
        <FileDispatchContext.Provider value={memoDispatch}>

            <FileContext.Provider value={memoFileState}>
                {children}
            </FileContext.Provider>
        </FileDispatchContext.Provider>
    );
};

