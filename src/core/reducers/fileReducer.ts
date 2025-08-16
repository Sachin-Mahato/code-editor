import { FileState } from "@/features/editor/types/types";
import { FileAction } from "@/features/fileExplorer/types/types";

export const initialFileState: FileState = {
    fileList: [],
    // openIds: [],
    active: "",
    editorContent: "",
};

export default function fileReducer(
    state: FileState,
    action: FileAction,
): FileState {
    switch (action.type) {
        case "RESET_EDITOR_VALUE":
            return { ...state, editorContent: "" };

        case "UPDATE_EDITOR": {
            const { id, value, lang } = action.payload;
            const exists = state.fileList.some(
                (f) => f.id === id && f.language === lang.toUpperCase(),
            );

            if (!exists) {
                return {
                    ...state,
                    editorContent: value,
                };
            }

            const updatedFileList = state.fileList.map((f) =>
                f.id === id ? { ...f, sourceCode: value } : f,
            );

            return {
                ...state,
                editorContent: value,
                fileList: updatedFileList,
            };
        }

        case "ADD_FILE_FROM_API": {
            const data = (action.payload ?? []).map((f) => ({
                ...f,
                id: String(f.id),
                fileName:
                    typeof f.fileName === "string"
                        ? f.fileName.trim()
                        : f.fileName,
                language:
                    typeof f.language === "string"
                        ? f.language.toUpperCase()
                        : f.language,
                sourceCode:
                    typeof f.sourceCode === "string" ? f.sourceCode : "",
                isOpen: false,
            }));

            const ids = new Set(data.map((f) => f.id));
            const keepActive = Boolean(state.active && ids.has(state.active));

            // prefer HTML if present
            const preferred = keepActive
                ? data.find((f) => f.id === state.active)
                : (data.find((f) => f.language === "HTML") ?? data[0]);

            return {
                ...state,
                fileList: data,
                editorContent: keepActive
                    ? state.editorContent
                    : (preferred?.sourceCode ?? ""),
                active: preferred ? String(preferred.id) : "",
            };
        }

        case "TOGGLE_FILE_ACTIVE": {
            const query = String(action.payload ?? "")
                .trim()
                .toLowerCase();

            const match = state.fileList.find((f) =>
                (f.fileName ?? "").toLowerCase().includes(query),
            );

            if (!match) {
                return state;
            }
            const updated = state.fileList.map((f) =>
                f.id === match.id
                    ? { ...f, isOpen: true }
                    : { ...f, isOpen: false },
            );
            return {
                ...state,
                active: match.id!,
                fileList: updated,
                editorContent: match.sourceCode!,
            };
        }

        default: {
            // Exhaustiveness check
            // const _exhaustive: never = action;
            return state;
        }
    }
}
