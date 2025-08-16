import { useCallback } from "react";
import { useFileDispatch } from "./usefileDispatcher";

export function useFileActionDispatchers() {
    const dispatch = useFileDispatch();

    const handleEditorChange = useCallback(
        (id: string, lang: string, value: string): void => {
            if (id && lang) {
                dispatch({
                    type: "UPDATE_EDITOR",
                    payload: { id: id, lang: lang, value: value },
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
            dispatch({
                type: "TOGGLE_FILE_ACTIVE",
                payload: fileName.trim(),
            });
        },
        [dispatch],
    );

    return {
        handleEditorChange,
        resetEditorValue,
        openFileInWorkspace,
    };
}
