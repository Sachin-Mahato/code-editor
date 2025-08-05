import React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Plus, Play, RotateCcw, Maximize2, Settings, PanelLeftClose, PanelLeftOpen } from "lucide-react"

interface TopBarProps {
    isExplorerCollapsed: boolean
    onToggleExplorer: () => void
    previewMode: "split" | "preview" | "code"
    onChangePreviewMode: (mode: "split" | "preview" | "code") => void
}

const TopBar: React.FC<TopBarProps> = ({
    isExplorerCollapsed,
    onToggleExplorer,
    previewMode,
    onChangePreviewMode,
}) => (
    <div className="flex items-center justify-between px-3 py-2 bg-[#2d2d30] border-b border-gray-700 flex-shrink-0 h-10">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onToggleExplorer}>
                {isExplorerCollapsed ? <PanelLeftOpen className="h-3 w-3" /> : <PanelLeftClose className="h-3 w-3" />}
            </Button>
            <Separator orientation="vertical" className="h-4 bg-gray-600" />
            <Badge variant="secondary" className="bg-green-600 text-white text-xs px-1.5 py-0.5 h-5">
                <div className="w-1.5 h-1.5 bg-white rounded-full mr-1" />
                Live
            </Badge>
            <span className="text-gray-300 text-xs">Code Editor</span>
        </div>

        <div className="flex items-center bg-[#3e3e42] rounded p-0.5">
            {(["code", "split", "preview"] as const).map((mode) => (
                <Button
                    key={mode}
                    variant={previewMode === mode ? "secondary" : "ghost"}
                    size="sm"
                    className="h-5 px-2 text-xs"
                    onClick={() => onChangePreviewMode(mode)}
                >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Button>
            ))}
        </div>

        <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm"><Plus className="h-3 w-3" /></Button>
            <Separator orientation="vertical" className="h-4 mx-1 bg-gray-600" />
            {[Play, RotateCcw, Maximize2, Settings].map((Icon, i) => (
                <Button key={i} variant="ghost" size="sm"><Icon className="h-3 w-3" /></Button>
            ))}
        </div>
    </div>
)

export default TopBar
