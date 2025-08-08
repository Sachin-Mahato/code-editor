import { useState, useRef, useCallback, useEffect } from "react"

import TopBar from "./TopBar"
import ExplorerPanel from "./ExplorerPanel"
import TabsArea from "@/features/fileExplorer/view/TabArea"
import CodeArea from "./CodeArea"
import useTab from "@/features/editor/tabs/useTab"

export const FileTreeLayout = () => {
    const { tabs } = useTab()

    const [isExplorerCollapsed, setIsExplorerCollapsed] = useState(false)
    const [previewMode, setPreviewMode] = useState<"split" | "preview" | "code">("split")
    const [splitRatio, setSplitRatio] = useState(50)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseDown = useCallback(() => {
        setIsDragging(true)
    }, [])

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!containerRef.current || !isDragging) return
        const rect = containerRef.current.getBoundingClientRect()
        const newRatio = ((e.clientX - rect.left) / rect.width) * 100
        setSplitRatio(Math.max(10, Math.min(90, newRatio)))
    }, [isDragging])

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

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
        <div className="flex flex-col h-screen w-full bg-gray-900 overflow-hidden" ref={containerRef}>
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

                    <CodeArea
                        containerRef={containerRef}
                        previewMode={previewMode}
                        splitRatio={splitRatio}
                        isDragging={isDragging}
                        onMouseDownDivider={handleMouseDown}
                        onDividerDoubleClick={handleDividerDoubleClick}
                    />
                </div>
            </div>
        </div>
    )
}
