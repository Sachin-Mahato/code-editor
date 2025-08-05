import { useEffect } from "react";
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

    const { data } = useFile(token ?? "");
    useEffect(() => {
        if (data) {
            dispatch({ type: "ADD_FILE_FROM_API", payload: data });
        }
    }, [data, dispatch]);

    return {
        handleEditorChange: (
            value: string | null,
            id?: string,
            lang?: string,
        ): void => {
            if (id && lang) {
                dispatch({
                    type: "UPDATE_EDITOR",
                    payload: {
                        value: value ?? "",
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
        resetEditorValue: (): void => {
            dispatch({ type: "RESET_EDITOR_VALUE" });
        },
        openFileInWorkspace: (fileName: string) =>
            dispatch({ type: "TOGGLE_FILE_ACTIVE", payload: fileName }),
    };
}
