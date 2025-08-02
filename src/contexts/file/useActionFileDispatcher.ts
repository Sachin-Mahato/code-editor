import { FileAction } from "@/types/types";

export function useActionDispatchers(
    dispatch: React.Dispatch<FileAction>,
    debouncedHtmlUpdate: (val: string) => void,
    debouncedCssUpdate: (val: string) => void,
) {
    return {
        setInputValue: (v: string) =>
            dispatch({ type: "SET_FILE_INPUT_VALUE", payload: v }),
        toggleActive: (name: string) =>
            dispatch({ type: "TOGGLE_FILE_ACTIVE", payload: name }),
        updateEditor: (val: string, id: string, lang: string) => {
            dispatch({
                type: "UPDATE_EDITOR",
                payload: { value: val, id, lang },
            });
            if (lang === "html") debouncedHtmlUpdate(val);
            if (lang === "css") debouncedCssUpdate(val);
        },
        checkClicked: (name: string) =>
            dispatch({ type: "CHECK_FILE_CLICKED", payload: name }),

        onTabClick: (text: string) =>
            dispatch({ type: "TOGGLE_FILE_ACTIVE", payload: text }),
    };
}
