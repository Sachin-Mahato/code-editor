import { FileState } from "@/features/editor/types/types";
import { FileAction } from "@/features/fileExplorer/types/types";

export const initialFileState: FileState = {
    fileList: [],
    openIds: [],
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
            const { id, value } = action.payload;
            const exists = state.fileList.some((f) => f.id === id);

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
            const nextFileList = [...action.payload];

            // Build helper sets/arrays
            const newIdsSet = new Set(
                nextFileList
                    .filter((f) => typeof f.id === "string")
                    .map((f) => f.id as string),
            );

            const htmlIds = nextFileList
                .filter(
                    (f) => f.language === "HTML" && typeof f.id === "string",
                )
                .map((f) => f.id as string);

            const isInitialLoad = state.fileList.length === 0;

            // Preserve currently open tabs if possible; on initial load, default to HTML files
            let nextOpenIds: string[] = [];
            if (isInitialLoad) {
                nextOpenIds = [...htmlIds];
            } else {
                const preserved = state.openIds.filter((id) =>
                    newIdsSet.has(id),
                );
                // If nothing is preserved (e.g., server changed file ids), fall back sensibly
                nextOpenIds =
                    preserved.length > 0
                        ? preserved
                        : htmlIds.length > 0
                          ? [htmlIds[0]]
                          : [];
            }

            // Determine next active:
            // - keep current active if it still exists
            // - else use first preserved open id
            // - else use first html id
            // - else empty
            const nextActive =
                state.active && newIdsSet.has(state.active)
                    ? state.active
                    : nextOpenIds.length > 0
                      ? nextOpenIds[0]
                      : htmlIds.length > 0
                        ? htmlIds[0]
                        : "";

            // Ensure active is included in openIds
            if (nextActive && !nextOpenIds.includes(nextActive)) {
                nextOpenIds = [...nextOpenIds, nextActive];
            }

            return {
                ...state,
                fileList: nextFileList,
                openIds: nextOpenIds,
                active: nextActive,
                // Keep editorContent as-is (don't clobber current buffer)
            };
        }

        case "TOGGLE_FILE_ACTIVE": {
            // Find the file by fileName
            const target = state.fileList.find(
                (f) => f.fileName?.trim() === action.payload.trim(),
            );

            if (!target || typeof target.id !== "string") {
                return state;
            }

            const activeId = target.id;

            const alreadyOpen = state.openIds.includes(activeId!);
            if (state.active === activeId && alreadyOpen) {
                return state;
            }

            const newOpenIds = alreadyOpen
                ? state.openIds
                : [...state.openIds, activeId];

            return {
                ...state,
                openIds: newOpenIds,
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
