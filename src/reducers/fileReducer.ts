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

        case "SET_FILE_INPUT_VALUE":
            return { ...state, fileInputValue: action.payload };

        case "UPDATE_EDITOR":
            return {
                ...state,
                editorVal: action.payload.value,
                // You might also want to update the file in the fileList here
                // depending on your requirements
            };

        case "ADD_FILE_FROM_API":
            return {
                ...state,
                fileList: [...state.fileList, ...action.payload],
            };

        case "TOGGLE_FILE_ACTIVE":
            const toggleFile = state.fileList.filter((f) =>
                f.id === action.payload ? !f.isOpen : f.isOpen,
            );
            return {
                ...state,
                fileList: [...toggleFile],
            };

        default: {
            // Exhaustiveness check
            // const _exhaustive: never = action;
            return state;
        }
    }
}
