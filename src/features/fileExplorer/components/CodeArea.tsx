import React from "react";
import Workspace from "@/features/editor/components/Workspace";
import LivePreview from "@/features/livePreview/LivePreview";
import Divider from "@/features/fileExplorer/components/Divider";
import useFileContext from "@/core/store/file/useFileContext";
import EmptyState from "./EmptyState";

interface ContentAreaProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    previewMode: "split" | "preview" | "code";
    splitRatio: number;
    isDragging: boolean;
    onMouseDownDivider: React.MouseEventHandler;
    onDividerDoubleClick: () => void;
}

const ContentArea: React.FC<ContentAreaProps> = ({
    containerRef,
    previewMode,
    splitRatio,
    onMouseDownDivider,
    onDividerDoubleClick,
}) => {
    const showCode = previewMode === "code" || previewMode === "split";
    const showPreview = previewMode === "preview" || previewMode === "split";
    const { fileList, active } = useFileContext();

    const activeFile = fileList.find(f => f.id === active);
    const htmlFiles = fileList.filter(f => f.language?.toUpperCase().trim() === "HTML".trim())


    return (
        <div
            className="flex flex-1 min-h-0 overflow-hidden"
            ref={containerRef} data-testid="code-area">
            {showCode && (
                <div
                    className="min-w-0 overflow-hidden bg-[#1e1e1e] flex flex-col"
                    style={{ width: previewMode === "split" ? `${splitRatio}%` : "100%" }}>
                    {activeFile ? (
                        <Workspace
                            key={activeFile.id}
                            id={activeFile.id!}
                            val={activeFile.sourceCode!}
                            lang={activeFile.language!.toLowerCase()}
                        />
                    ) : (
                        <EmptyState
                            icon="📝"
                            title="No files open"
                            subtitle="Open a file from the explorer to start coding" />
                    )}
                </div>
            )}

            {previewMode === "split" && (
                <Divider
                    onMouseDown={onMouseDownDivider}
                    onDoubleClick={onDividerDoubleClick} />
            )}

            {showPreview && (
                <div className="min-w-0 overflow-hidden flex flex-col bg-white"
                    style={{ width: previewMode === "split" ? `${100 - splitRatio}%` : "100%" }}>
                    {htmlFiles.length > 0 ? (
                        htmlFiles.map(f => {
                            return <LivePreview
                                key={f.id}
                                htmlValue={f.sourceCode!} />

                        }

                        )
                    ) : (
                        <EmptyState
                            icon="🌐"
                            title="No HTML to preview"
                            subtitle="Select an HTML file to see the live preview" />
                    )}
                </div>
            )}
        </div>
    );
};




export default ContentArea;