import React from "react"
import { Card } from "@/components/ui/card"
import FileExplorer from "./FileExplorer"

interface ExplorerPanelProps {
    isCollapsed: boolean
}

const ExplorerPanel: React.FC<ExplorerPanelProps> = ({ isCollapsed }) => (
    <div
        className={`${isCollapsed ? "w-0" : "w-64"} transition-all duration-300 ease-in-out border-r border-gray-700 flex-shrink-0 overflow-hidden`}
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
)

export default ExplorerPanel
