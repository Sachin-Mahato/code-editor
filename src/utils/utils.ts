export default function makeActiveByName<T extends {fileName: string}>(files:T[],name:string): T[] {
    const lowerName = name.toLowerCase().trim();

    return files.map(f => (
        f.fileName.toLowerCase().trim() === lowerName
        ? {...f, isOpen: true}
        : {...f, isOpen: false}
    ))
}