import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
    Edit,
    Copy,
    Download,
    Trash2,
    Folder,
    FolderOpen,
} from "lucide-react"
import { getLanguageColor, getLanguageIcon } from "@/features/fileExplorer/utils/languageUtil"
import { useState } from "react"

type Node = {
    name: string
    nodes?: Node[]
}

export default function FileSystemTree({ node }: { node: Node }) {
    const [expanded, setExpanded] = useState(false)
    const isFolder = !!node.nodes?.length

    return (
        <div>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div
                        className={`
              flex items-center gap-2 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer
              text-gray-300 hover:text-white transition-colors
            `}
                        onClick={() => {
                            if (isFolder) setExpanded(!expanded)
                            // else handle file click here if needed
                        }}
                    >
                        {isFolder ? (
                            expanded ? (
                                <FolderOpen className="h-4 w-4 text-blue-400" />
                            ) : (
                                <Folder className="h-4 w-4 text-blue-400" />
                            )
                        ) : (
                            <span className={`text-sm ${getLanguageColor(node.name?.toLowerCase())}`}>
                                {getLanguageIcon(node.name?.toLowerCase() || "")}
                            </span>
                        )}
                        <span className="text-sm flex-1 truncate">{node.name}</span>
                    </div>
                </ContextMenuTrigger>

                <ContextMenuContent className="bg-[#2d2d30] border-gray-700">
                    <ContextMenuItem className="text-gray-300 hover:bg-gray-700 hover:text-white">
                        <Edit className="h-4 w-4 mr-2" />
                        Rename
                    </ContextMenuItem>
                    <ContextMenuItem className="text-gray-300 hover:bg-gray-700 hover:text-white">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                    </ContextMenuItem>
                    <ContextMenuItem className="text-gray-300 hover:bg-gray-700 hover:text-white">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                    </ContextMenuItem>
                    <ContextMenuItem className="text-red-400 hover:bg-red-600 hover:text-white">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            {/* Recursive rendering of children */}
            {isFolder && expanded && (
                <div className="pl-4">
                    {node.nodes!.map((child) => (
                        <FileSystemTree key={child.name} node={child} />
                    ))}
                </div>
            )}
        </div>
    )
}
