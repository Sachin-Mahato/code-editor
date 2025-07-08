// import useFileContext from "../../hooks/useFileContext";
// import LivePreview from "../livePreview/LivePreview";
// import Workspace from "../workspace/Workspace";
// import FileExplorer from "./FileExplorer";

// export const FileTreeLayout = () => {
//     const { tabs, htmlFiles } = useFileContext()

//     return (
//         <div
//             role="region"
//             aria-label="File Tree Layout"
//             className="grid grid-cols-[auto_1fr] h-screen w-full"
//         >
//             {/* Left Panel: Explore */}
//             <aside >
//                 <FileExplorer />
//             </aside>

//             {/* Right Panel: Workspace + Live Preview */}
//             <div className="grid grid-rows-[1fr_1fr]">
//                 {/* Top: Workspace */}
//                 <section className="overflow-auto">
//                     {Array.isArray(tabs) && tabs.length > 0 &&
//                         tabs.map(file =>
//                             file.isOpen ? (
//                                 <Workspace
//                                     key={file.fileId}
//                                     id={file.fileId}
//                                     lang={file.language}
//                                     val={file.content}
//                                 />
//                             ) : null
//                         )
//                     }
//                 </section>

//                 {/* Bottom: Live Preview */}
//                 <section role="region" aria-label="Live Preview" className="overflow-auto ">
//                     {htmlFiles.length > 0 &&
//                         htmlFiles.map(file => (
//                             <LivePreview
//                                 key={file.fileId}
//                                 htmlValue={file.content}
//                             />
//                         ))
//                     }
//                 </section>
//             </div>
//         </div>

//     );
// };



import React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PanelLeftClose, PanelLeftOpen, RotateCcw, Play, Maximize2, Settings, Plus } from "lucide-react"
import useFileContext from "../../hooks/useFileContext"
import LivePreview from "../livePreview/LivePreview"
import Workspace from "../workspace/Workspace"
import FileExplorer from "./FileExplorer"
import Tabs from "../workspace/Tabs"

export const FileTreeLayout = () => {
    const { tabs, htmlFiles } = useFileContext()
    const [isExplorerCollapsed, setIsExplorerCollapsed] = useState(false)
    const [previewMode, setPreviewMode] = useState<"split" | "preview" | "code">("split")
    const [splitRatio, setSplitRatio] = useState(50) // Percentage for code editor
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            if (previewMode !== "split") return
            setIsDragging(true)
            e.preventDefault()
        },
        [previewMode],
    )

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDragging || !containerRef.current || previewMode !== "split") return

            const container = containerRef.current
            const containerRect = container.getBoundingClientRect()
            const newRatio = ((e.clientX - containerRect.left) / containerRect.width) * 100

            // Constrain between 15% and 85% - now both panels can resize properly
            const constrainedRatio = Math.min(Math.max(newRatio, 15), 85)
            setSplitRatio(constrainedRatio)
        },
        [isDragging, previewMode],
    )

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    // Add global mouse event listeners
    React.useEffect(() => {
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

    // Double-click to reset split ratio
    const handleDividerDoubleClick = () => {
        setSplitRatio(50)
    }

    return (
        <div className="flex flex-col h-screen w-full bg-gray-900 overflow-hidden">
            {/* Single Unified Top Bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#2d2d30] border-b border-gray-700 flex-shrink-0 h-10">
                {/* Left Section */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                        onClick={() => setIsExplorerCollapsed(!isExplorerCollapsed)}
                    >
                        {isExplorerCollapsed ? <PanelLeftOpen className="h-3 w-3" /> : <PanelLeftClose className="h-3 w-3" />}
                    </Button>

                    <Separator orientation="vertical" className="h-4 bg-gray-600" />

                    <Badge variant="secondary" className="bg-green-600 text-white text-xs px-1.5 py-0.5 h-5">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-1" />
                        Live
                    </Badge>
                    <span className="text-gray-300 text-xs">Code Editor</span>
                </div>

                {/* Center Section - View Mode Switcher */}
                <div className="flex items-center bg-[#3e3e42] rounded p-0.5">
                    <Button
                        variant={previewMode === "code" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-5 px-2 text-xs"
                        onClick={() => setPreviewMode("code")}
                    >
                        Code
                    </Button>
                    <Button
                        variant={previewMode === "split" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-5 px-2 text-xs"
                        onClick={() => setPreviewMode("split")}
                    >
                        Split
                    </Button>
                    <Button
                        variant={previewMode === "preview" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-5 px-2 text-xs"
                        onClick={() => setPreviewMode("preview")}
                    >
                        Preview
                    </Button>
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                        onClick={() => {
                            console.log("Create new file")
                        }}
                    >
                        <Plus className="h-3 w-3" />
                    </Button>

                    <Separator orientation="vertical" className="h-4 mx-1 bg-gray-600" />

                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700">
                        <Play className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700">
                        <RotateCcw className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700">
                        <Maximize2 className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700">
                        <Settings className="h-3 w-3" />
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 min-h-0 overflow-hidden">
                {/* Left Panel: File Explorer - With smooth animation */}
                <div
                    className={`${isExplorerCollapsed ? "w-0" : "w-64"
                        } transition-all duration-300 ease-in-out border-r border-gray-700 flex-shrink-0 overflow-hidden`}
                >
                    <Card className="h-full w-64 rounded-none border-0 bg-[#252526]">
                        <div className="flex items-center justify-between px-2 py-1.5 border-b border-gray-700 h-8">
                            <span className="text-gray-300 text-xs font-medium">EXPLORER</span>
                        </div>
                        <div className="flex-1 overflow-auto">
                            <FileExplorer />
                        </div>
                    </Card>
                </div>

                {/* Right Panel: Main Content - Takes full space when explorer collapsed */}
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    {/* Tabs - Integrated directly into layout */}
                    {Array.isArray(tabs) && tabs.length > 0 && (
                        <div className="bg-[#2d2d30] border-b border-gray-700 flex-shrink-0">
                            <Tabs />
                        </div>
                    )}

                    {/* Flexible Content Area - Both panels can resize */}
                    <div className="flex flex-1 min-h-0 overflow-hidden" ref={containerRef}>
                        {/* Code Editor Section - Can expand both ways */}
                        {(previewMode === "code" || previewMode === "split") && (
                            <div
                                className="min-w-0 overflow-hidden bg-[#1e1e1e] flex flex-col"
                                style={{
                                    width: previewMode === "split" ? `${splitRatio}%` : "100%",
                                    flexShrink: 0,
                                }}
                            >
                                {Array.isArray(tabs) && tabs.length > 0 ? (
                                    tabs.map((file) =>
                                        file.isOpen ? (
                                            <Workspace key={file.fileId} id={file.fileId} lang={file.language} val={file.content} />
                                        ) : null,
                                    )
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-gray-400">
                                        <div className="text-center">
                                            <div className="text-4xl mb-4">📝</div>
                                            <p className="text-lg mb-2">No files open</p>
                                            <p className="text-sm">Open a file from the explorer to start coding</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Resizable Divider */}
                        {previewMode === "split" && (
                            <div
                                className="w-1 bg-gray-700 hover:bg-blue-500 cursor-col-resize flex-shrink-0 transition-colors duration-200 relative group"
                                onMouseDown={handleMouseDown}
                                onDoubleClick={handleDividerDoubleClick}
                            >
                                <div className="absolute inset-y-0 -left-2 -right-2 group-hover:bg-blue-500/10" />
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-1 h-8 bg-blue-400 rounded-full" />
                                </div>
                            </div>
                        )}

                        {/* Live Preview Section - Clean and minimal */}
                        {(previewMode === "preview" || previewMode === "split") && (
                            <div
                                className="min-w-0 overflow-hidden flex flex-col bg-white"
                                style={{
                                    width: previewMode === "split" ? `${100 - splitRatio}%` : "100%",
                                    flexGrow: 1,
                                }}
                            >
                                {/* Clean Preview Content - No unnecessary headers */}
                                <div className="flex-1 overflow-auto min-h-0">
                                    {htmlFiles.length > 0 ? (
                                        htmlFiles.map((file) => <LivePreview key={file.fileId} htmlValue={file.content} />)
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400 bg-gray-50">
                                            <div className="text-center">
                                                <div className="text-4xl mb-4">🌐</div>
                                                <p className="text-lg mb-2">No HTML to preview</p>
                                                <p className="text-sm">Create an HTML file to see the live preview</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
