import { useState, useRef, useCallback, useEffect } from "react"
import useFileContext from "../../hooks/useFileContext"

import TopBar from "./TopBar"
import ExplorerPanel from "./ExplorerPanel"
import TabsArea from "@/components/fileTree/TabArea"
import ContentArea from "./CodeArea"

export const FileTreeLayout = () => {
    const { tabs, htmlFiles } = useFileContext()

    const [isExplorerCollapsed, setIsExplorerCollapsed] = useState(false)
    const [previewMode, setPreviewMode] = useState<"split" | "preview" | "code">("split")
    const [splitRatio, setSplitRatio] = useState(50)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseDown = useCallback(() => { }, [previewMode])
    const handleMouseMove = useCallback(() => { }, [isDragging, previewMode])
    const handleMouseUp = useCallback(() => setIsDragging(false), [])

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
            document.body.style.cursor = "col-resize"
            document.body.style.userSelect = "none"
            return () => {
                document.removeEventListener("mousemove", handleMouseMove)
                document.removeEventListener("mouseup", handleMouseUp)
                document.body.style.cursor = ""
                document.body.style.userSelect = ""
            }
        }
    }, [isDragging, handleMouseMove, handleMouseUp])

    const handleDividerDoubleClick = () => setSplitRatio(50)

    return (
        <div className="flex flex-col h-screen w-full bg-gray-900 overflow-hidden">
            <TopBar
                isExplorerCollapsed={isExplorerCollapsed}
                onToggleExplorer={() => setIsExplorerCollapsed(!isExplorerCollapsed)}
                previewMode={previewMode}
                onChangePreviewMode={setPreviewMode}
            />

            <div className="flex flex-1 min-h-0 overflow-hidden">
                <ExplorerPanel isCollapsed={isExplorerCollapsed} />

                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    {tabs.length > 0 && <TabsArea />}

                    <ContentArea
                        containerRef={containerRef}
                        previewMode={previewMode}
                        splitRatio={splitRatio}
                        isDragging={isDragging}
                        onMouseDownDivider={handleMouseDown}
                        onDividerDoubleClick={handleDividerDoubleClick}
                        tabs={tabs}
                        htmlFiles={htmlFiles}
                    />
                </div>
            </div>
        </div>
    )
}
