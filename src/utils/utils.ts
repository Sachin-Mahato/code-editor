import { ApiFileResponse, FileType } from "../types/types";

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

// 1) Define the raw API shape
interface ApiFile {
    id: string;
    fileName: string;
    language: string;
    sourceCode: string;
}

// 2) Rename your function and its parameter to something that won’t collide:
export  function mapApiFilesResponse(
    rawFilesById: Record<string, ApiFile> | null | undefined,
): FileType[] {
    if (!rawFilesById) {
        console.warn("mapApiFilesResponse: got empty input");
        return [];
    }

    console.log("raw API files:", rawFilesById);

    const files: FileType[] = Object.values(rawFilesById).map((apiFile) => ({
        id: apiFile.id,
        fileName: apiFile.fileName,
        language: apiFile.language,
        sourceCode: apiFile.sourceCode,
        isOpen: false,
    }));

    console.log("mapped FileType[]:", files);
    return files;
}
