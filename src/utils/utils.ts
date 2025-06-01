import { FileType } from "../types/types";

export default function makeActiveByName<T extends {fileName: string}>(files:T[],name:string): T[] {
    const lowerName = name.toLowerCase().trim();

    return files.map(f => (
        f.fileName.toLowerCase().trim() === lowerName
        ? {...f, isOpen: true}
        : {...f, isOpen: false}
    ))
}


export const generateUniqueId = () => crypto.randomUUID();

export  const updater = (files: FileType[], id: string, val: string):FileType[] => files.map(file => 
            file.fileId === id ? { ...file, content: val } : file);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};