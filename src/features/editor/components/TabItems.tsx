// src/components/editor/tabs/TabItem.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { getLanguageIcon, getLanguageColor } from "@/features/fileExplorer/utils/languageUtil"

interface TabItemProps {
    fileId: string
    fileName: string
    isModified: boolean
    isActive: boolean
    onActivate: (id: string) => void
    onClose: (id: string) => void
}

export default function TabItem({
    fileId,
    fileName,
    isModified,
    isActive,
    onActivate,
    onClose,
}: TabItemProps) {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            className={`relative flex items-center gap-2 px-3 py-1.5 border-r border-gray-700 cursor-pointer
        ${isActive
                    ? "bg-[#1e1e1e] text-white border-t-2 border-blue-500"
                    : "bg-[#2d2d30] text-gray-300 hover:bg-[#3e3e42] hover:text-white"
                }
        min-w-[100px] max-w-[180px] flex-shrink-0
      `}
            onClick={() => onActivate(fileId)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={getLanguageColor(fileName)}>
                {getLanguageIcon(fileName)}
            </div>

            <span className="text-xs font-medium truncate flex-1">{fileName}</span>

            {isModified && <div className="w-1.5 h-1.5 bg-white rounded-full" />}

            <Button
                variant="ghost" size="sm"
                className={`
          h-3.5 w-3.5 p-0 rounded-sm flex-shrink-0
          ${hovered ? "opacity-100" : "opacity-0"} transition-opacity
        `}
                onClick={(e) => {
                    e.stopPropagation()
                    onClose(fileId)
                }}
            >
                <X className="h-2.5 w-2.5" />
            </Button>
        </div>
    )
}
