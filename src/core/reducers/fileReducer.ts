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

        case "UPDATE_EDITOR":
            return {
                ...state,
                editorVal: action.payload.value,
            };

        case "ADD_FILE_FROM_API":
            return {
                ...state,
                fileList: [...action.payload],
                openIds: action.payload
                    ?.filter((f) => f.language === "HTML" && f.id !== undefined)
                    .map((f) => f.id as string),

                active: (() => {
                    const htmlFile = action.payload.find(
                        (f) => f.language === "HTML" && f.id !== undefined,
                    );
                    return htmlFile?.id ?? "";
                })(),
            };

        case "TOGGLE_FILE_ACTIVE": {
            // Find the file by fileName
            const file = state.fileList.find(
                (f) => f.fileName === action.payload,
            );
            const activeId = file?.id ?? "";

            if (!activeId) {
                // If no file or id found, do not change state
                return state;
            }

            // Add the id to openIds if not already present
            const openIds = state.openIds.includes(activeId)
                ? state.openIds
                : [...state.openIds, activeId];

            console.log({ active: activeId, ids: openIds });
            return {
                ...state,
                openIds,
                active: activeId,
            };
        }

        default: {
            // Exhaustiveness check
            // const _exhaustive: never = action;
            return state;
        }
    }
}
