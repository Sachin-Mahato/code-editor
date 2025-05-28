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