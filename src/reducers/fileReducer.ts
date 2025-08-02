import { FileState, FileAction } from "@/types/types";

export const initialFileState: FileState = {
    fileInputValue: "",
    fileList: [],
    editorVal: "",
};

export default function fileReducer(
    state: FileState,
    action: FileAction,
): FileState {
    switch (action.type) {
        case "RESET_EDITOR_VALUE":
            return { ...state, editorVal: "" };

        default: {
            // Exhaustiveness check
            // const _exhaustive: never = action;
            return state;
        }
    }
}
