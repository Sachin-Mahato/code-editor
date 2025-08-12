import { JSX } from "react";

export type ApiFileResponse = {
    id?: string;
    fileName?: string;
    language?: string;
    sourceCode?: string;

    children?: ApiFileResponse;
};

export type ApiUserDetails = {
    id: string;
    username: string;
    email?: string;
};

export enum FileTypeEnum {
    File = "file",
    Folder = "folder",
}

export interface FileItem {
    id: string;
    name: string;
    type: FileTypeEnum;
    language?: string;
    children?: FileItem[];
    isOpen?: boolean;
    sourceCode?: string;
}

export interface FileBase extends ApiFileResponse {
    isOpen?: boolean;

    children?: FileBase;
}

export type FileType = FileBase;

export interface FileItem {
    id: string;
    name: string;
    type: FileTypeEnum;
    language?: string;
    children?: FileItem[];
}

export type Item = {
    icon: JSX.Element;
    title: string;
    description: string;
};

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
