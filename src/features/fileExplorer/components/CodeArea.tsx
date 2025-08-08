import React from "react";
import Workspace from "@/features/editor/components/Workspace";
import LivePreview from "@/features/livePreview/LivePreview";
import Divider from "@/features/fileExplorer/components/Divider";
import useFileContext from "@/core/store/file/useFileContext";

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
    const { fileList, active } = useFileContext(); // active is file id

    const activeFile = fileList.find(f => f.id === active);

    return (
        <div className="flex flex-1 min-h-0 overflow-hidden" ref={containerRef} data-testid="code-area">
            {showCode && (
                <div className="min-w-0 overflow-hidden bg-[#1e1e1e] flex flex-col"
                    style={{ width: previewMode === "split" ? `${splitRatio}%` : "100%" }}>
                    {activeFile ? (
                        <Workspace
                            key={activeFile.id}
                            id={activeFile.id!}
                            val={activeFile.sourceCode!}
                            lang={activeFile.language!.toLowerCase()}
                        />
                    ) : (
                        <EmptyState icon="📝" title="No files open" subtitle="Open a file from the explorer to start coding" />
                    )}
                </div>
            )}

            {previewMode === "split" && (
                <Divider onMouseDown={onMouseDownDivider} onDoubleClick={onDividerDoubleClick} />
            )}

            {showPreview && (
                <div className="min-w-0 overflow-hidden flex flex-col bg-white"
                    style={{ width: previewMode === "split" ? `${100 - splitRatio}%` : "100%" }}>
                    {fileList.filter(f => f.language === "HTML") ? (
                        fileList.map(f => (
                            <LivePreview key={f.id} htmlValue={f.sourceCode!} />
                        )
                        )
                    ) : (
                        <EmptyState icon="🌐" title="No HTML to preview" subtitle="Select an HTML file to see the live preview" />
                    )}
                </div>
            )}
        </div>
    );
};


const EmptyState: React.FC<{ icon: string; title: string; subtitle: string }> = ({
    icon,
    title,
    subtitle,
}) => (
    <div className="flex items-center justify-center h-full text-gray-400 bg-gray-50">
        <div className="text-center">
            <div className="text-4xl mb-4">{icon}</div>
            <p className="text-lg mb-2">{title}</p>
            <p className="text-sm">{subtitle}</p>
        </div>
    </div>
);

export default ContentArea;