import { useEffect, useRef, useCallback } from "react";
import useStorage from "@/core/utils/useStorage";
import useFile from "@/core/utils/useFile";
import { useFileTreeDispatch } from "./useFileTreeDispatch";

export function useActionDispatchers() {
    const dispatch = useFileTreeDispatch();
    const { token } = useStorage();

    if (!dispatch) {
        throw new Error(
            "useActionDispatchers must be used within a FileTreeProvider",
        );
    }

    const { data, dataUpdatedAt } = useFile(token ?? "");

    const lastAppliedUpdateRef = useRef<number>(0);

    useEffect(() => {
        if (!data || !dataUpdatedAt) return;

        // Only dispatch when the server data has actually updated
        if (lastAppliedUpdateRef.current === dataUpdatedAt) return;

        lastAppliedUpdateRef.current = dataUpdatedAt;

        dispatch({ type: "ADD_FILE_FROM_API", payload: data });
    }, [dataUpdatedAt, data, dispatch]);

    const handleEditorChange = useCallback(
        (id: string, lang: string, value: string): void => {
            if (id && lang) {
                dispatch({
                    type: "UPDATE_EDITOR",
                    payload: {
                        value,
                        id,
                        lang,
                    },
                });
            } else {
                dispatch({
                    type: "SET_FILE_INPUT_VALUE",
                    payload: value ?? "",
                });
            }
        },
        [dispatch],
    );

    const resetEditorValue = useCallback((): void => {
        dispatch({ type: "RESET_EDITOR_VALUE" });
    }, [dispatch]);

    const openFileInWorkspace = useCallback(
        (fileName: string) => {
            dispatch({ type: "TOGGLE_FILE_ACTIVE", payload: fileName.trim() });
        },
        [dispatch],
    );

    return {
        handleEditorChange,
        resetEditorValue,
        openFileInWorkspace,
    };
}
