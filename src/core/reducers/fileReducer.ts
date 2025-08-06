import { FileState } from "@/features/editor/types/types";
import { FileAction } from "@/features/fileExplorer/types/types";

export const initialFileState: FileState = {
    fileList: [],
    openIds: [],
    active: "",
    editorVal: "",
};

export default function fileReducer(
    state: FileState,
    action: FileAction,
): FileState {
    switch (action.type) {
        case "RESET_EDITOR_VALUE":
            return { ...state, editorVal: "" };

        // case "SET_FILE_INPUT_VALUE":
        //     return { ...state, fileInputValue: action.payload };

        case "UPDATE_EDITOR":
            return {
                ...state,
                editorVal: action.payload.value,
            };

        case "ADD_FILE_FROM_API":
            return {
                ...state,
                fileList: [...state.fileList, ...action.payload],
            };

        case "TOGGLE_FILE_ACTIVE":
            const file = state.fileList.find(
                (f) => f.fileName === action.payload,
            );
            return {
                ...state,
                openIds: file && file.id ? [file.id] : [],
            };

        default: {
            // Exhaustiveness check
            // const _exhaustive: never = action;
            return state;
        }
    }
}
