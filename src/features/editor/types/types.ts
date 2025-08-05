import { FileType } from "@/features/fileExplorer/types/types";

export interface FileTab {
    fileId: string;
    fileName: string;
    language: string;
    isModified: boolean;
    isActive: boolean;
}
export type TabsAction =
    | { type: "SET_TABS"; payload: FileTab[] }
    | { type: "ADD_TAB"; payload: FileTab }
    | { type: "CLOSE_TAB"; payload: string }
    | { type: "SWITCH_TAB"; payload: string };

export interface FileState {
    fileInputValue: string;
    fileList: FileType[];
    editorVal: string;
}

export type TabsState = FileTab[];
