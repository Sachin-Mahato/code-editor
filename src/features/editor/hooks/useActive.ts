import { useMemo } from "react";
import type { FileBase } from "@/features/fileExplorer/types/types";

export type UseActiveResult = {
    id?: string;
    val?: string;
    lang?: string;
    file?: FileBase;
};

export default function useActive(
    fileList: FileBase[] = [],
    active?: string,
): UseActiveResult {
    const activeFile = useMemo(() => {
        if (!Array.isArray(fileList) || !active) return undefined;
        return fileList.find((f) => f.id === active);
    }, [fileList, active]);

    return useMemo(
        () => ({
            id: activeFile?.id,
            val: activeFile?.sourceCode,
            lang: activeFile?.language,
            file: activeFile,
        }),
        [activeFile],
    );
}
