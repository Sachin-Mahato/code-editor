import {
    ApiFileResponse,
    FileType,
    FileTypeEnum,
} from "../../features/fileExplorer/types/types";

export default function makeActiveByName<T extends { fileName: string }>(
    files: T[],
    name: string,
): T[] {
    const lowerName = name.toLowerCase().trim();

    return files.map((f) =>
        f.fileName.toLowerCase().trim() === lowerName
            ? { ...f, isOpen: true }
            : { ...f, isOpen: false },
    );
}

export const generateUniqueId = () => crypto.randomUUID();

export const updater = (
    files: FileType[],
    id: string,
    val: string,
): FileType[] =>
    files.map((file) => (file.id === id ? { ...file, content: val } : file));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(
    fn: T,
    delay: number,
) => {
    let timer: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

export function isValidString(str: string): boolean {
    const match = /^[A-Za-z][A-Za-z\s]*$/;

    const value = str.trim();

    if (!match.test(value)) {
        return false;
    }
    return true;
}

interface ApiFile {
    id: string;
    fileName: string;
    language: string;
    sourceCode: string;
}

export function mapApiFilesResponse(
    rawFilesById: Record<string, ApiFile> | null | undefined,
): FileType[] {
    if (!rawFilesById) {
        console.warn("mapApiFilesResponse: got empty input");
        return [];
    }

    const files: FileType[] = Object.values(rawFilesById).map((apiFile) => ({
        id: apiFile.id,
        fileName: apiFile.fileName,
        language: apiFile.language,
        sourceCode: apiFile.sourceCode,

        // UI
        type: FileTypeEnum.File,
        isOpen: false,
    }));

    return files;
}

/** simplified DTO for a single folder */
export interface SingleFolderDto {
    id: string;
    name: string;
    type: FileTypeEnum.Folder;
    isOpen: boolean;
    children: {
        id: string;
        name: string;
        type: FileTypeEnum.File;
        isOpen: boolean;
    }[];
}

/**
 * map one API response array into a single folder DTO
 */
export function mapToSingleFolderDto(
    apiFiles: ApiFileResponse[],
    folderId: string,
    folderName: string,
): SingleFolderDto {
    return {
        id: folderId,
        name: folderName,
        type: FileTypeEnum.Folder,
        isOpen: true, // you can default it open
        children: apiFiles.map((f) => ({
            id: f.id!, // hopefully your API always sends IDs here
            name: f.fileName || "", // default to empty string if missing
            type: FileTypeEnum.File, // everything in this array is a file
            isOpen: false, // files aren’t “openable”
        })),
    };
}
