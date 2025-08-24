import useFileContext from "@/core/store/file/useFileContext";
import EmptyBoundary from "./EmptyBoundary";
import EmptyState from "@/features/fileExplorer/components/EmptyState";
import { useMemo } from "react";
import React from "react";

function WorkspaceContainer({ children }: { children: React.ReactNode }) {
    const { fileList, active } = useFileContext();

    const isEmpty = useMemo(() => {
        const activeFile = fileList.find(f => f.id === active);
        return !activeFile;
    }, [fileList, active])

    return (
        <EmptyBoundary
            isEmpty={isEmpty}
            emptyFallback={
                <EmptyState
                    icon="📝"
                    title="No files open"
                    subtitle="Open a file from the explorer to start coding"
                />
            }
        >
            {children}
        </EmptyBoundary>
    );
}

export default React.memo(WorkspaceContainer)