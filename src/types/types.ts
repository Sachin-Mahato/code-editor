import { JSX } from "react";

export type ApiFileResponse = {
    id?: string;
    fileName?: string;
    language?: string;
    sourceCode?: string;
};

export type ApiUserDetails = {
    id: string;
    username: string;
    email?: string;
};

export interface FileBase extends ApiFileResponse {
    isOpen?: boolean;
}

export interface FileType extends FileBase {}

enum FileTypeEnum {
    file,
    folder,
}
export interface FileItem {
    id: string;
    name: string;
    type: FileTypeEnum;
    language?: string;
    children?: FileItem[];
}

export interface FileTab {
    fileId: string;
    fileName: string;
    language: string;
    isModified: boolean;
    isActive: boolean;
}

export type Item = {
    icon: JSX.Element;
    title: string;
    description: string;
};

export type TabsState = FileTab[];

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

export type FileAction =
    | { type: "SET_FILE_INPUT_VALUE"; payload: string }
    | { type: "TOGGLE_FILE_ACTIVE"; payload: string }
    | {
          type: "UPDATE_EDITOR";
          payload: { value: string; id: string; lang: string };
      }
    | { type: "CHECK_FILE_CLICKED"; payload: string }
    | { type: "ADD_FILE_FROM_API"; payload: FileType[] }
    | { type: "RESET_EDITOR_VALUE" };
