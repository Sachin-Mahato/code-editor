import React from "react"
import Workspace from "@/components/workspace/Workspace"
import LivePreview from "@/components/livePreview/LivePreview"
import Divider from "@/components/fileTree/Divider"

interface ContentAreaProps {
    containerRef: React.RefObject<HTMLDivElement | null>
    previewMode: "split" | "preview" | "code"
    splitRatio: number
    isDragging: boolean
    onMouseDownDivider: React.MouseEventHandler
    onDividerDoubleClick: () => void
    tabs: Array<{ fileId: string; isOpen: boolean; language: string; content: string }>
    htmlFiles: Array<{ fileId: string; content: string }>
}

const ContentArea: React.FC<ContentAreaProps> = (
    {
        containerRef,
        previewMode,
        splitRatio,
        onMouseDownDivider,
        onDividerDoubleClick,
        tabs,
        htmlFiles,
    }
) => {
    const showCode = previewMode === "code" || previewMode === "split"
    const showPreview = previewMode === "preview" || previewMode === "split"

    return (
        <div className="flex flex-1 min-h-0 overflow-hidden" ref={containerRef}
            data-testid="code-area"
        >
            {showCode && (
                <div
                    className="min-w-0 overflow-hidden bg-[#1e1e1e] flex flex-col"
                    style={{ width: previewMode === "split" ? `${splitRatio}%` : "100%" }}
                >
                    {tabs.length > 0 ? (
                        tabs.map((f) => f.isOpen && <Workspace key={f.fileId} id={f.fileId} lang={f.language} val={f.content} />)
                    ) : (
                        <EmptyState icon="📝" title="No files open" subtitle="Open a file from the explorer to start coding" />
                    )}
                </div>
            )}

            {previewMode === "split" && (
                <Divider onMouseDown={onMouseDownDivider} onDoubleClick={onDividerDoubleClick} />
            )}

            {showPreview && (
                <div
                    className="min-w-0 overflow-hidden flex flex-col bg-white"
                    style={{ width: previewMode === "split" ? `${100 - splitRatio}%` : "100%" }}
                >
                    {htmlFiles.length > 0 ? (
                        htmlFiles.map((f) => <LivePreview key={f.fileId} htmlValue={f.content} />)
                    ) : (
                        <EmptyState icon="🌐" title="No HTML to preview" subtitle="Create an HTML file to see the live preview" />
                    )}
                </div>
            )}
        </div>
    )
}

// Simple reusable empty-state panel
const EmptyState: React.FC<{ icon: string; title: string; subtitle: string }> = ({ icon, title, subtitle }) => (
    <div className="flex items-center justify-center h-full text-gray-400 bg-gray-50">
        <div className="text-center">
            <div className="text-4xl mb-4">{icon}</div>
            <p className="text-lg mb-2">{title}</p>
            <p className="text-sm">{subtitle}</p>
        </div>
    </div>
)

export default ContentArea
