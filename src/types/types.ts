export type FileType = {
    fileId: string;
    fileName: string;
    language: string;
    content: string;
    isOpen: boolean;
};
export type htmlFileType = {
    fileId: string;
    fileName: string;
    language: string;
    content: string;
    isOpen: boolean;
};

export type cssFileType = {
    fileId: string;
    fileName: string;
    language: string;
    content: string;
    isOpen: boolean;
};

export interface FileItem {
    id: string;
    name: string;
    type: "file" | "folder";
    language?: string;
    children?: FileItem[];
}
