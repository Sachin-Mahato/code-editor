import React from "react"
import { FileItem, FileTypeEnum } from "@/types/types"
import { Copy, Download, Edit, Folder, FolderOpen, Trash2 } from "lucide-react"
import { getLanguageColor, getLanguageIcon } from "../workspace/languageUtil"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu"


const renderFileTree = (
    items: FileItem[],
    depth: number = 0,
    expandedFolders: Set<string>,
    setExpandedFolders: React.Dispatch<React.SetStateAction<Set<string>>>
): React.ReactNode => {
    const toggleFolder = (folderId: string) => {
        const newSet = new Set(expandedFolders)
        if (newSet.has(folderId)) newSet.delete(folderId)
        else newSet.add(folderId)
        setExpandedFolders(newSet)
    }

    return items.map((item) => (
        <div key={item.id}>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div
                        className={`
              flex items-center gap-2 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer
              text-gray-300 hover:text-white transition-colors
            `}
                        style={{ paddingLeft: `${depth * 16 + 8}px` }}
                        onClick={() => item.type === FileTypeEnum.Folder && toggleFolder(item.id)}
                    >
                        {item.type === FileTypeEnum.Folder ? (
                            expandedFolders.has(item.id) ? (
                                <FolderOpen className="h-4 w-4 text-blue-400" />
                            ) : (
                                <Folder className="h-4 w-4 text-blue-400" />
                            )
                        ) : (
                            <span className={`text-sm ${getLanguageColor(item.language?.toLowerCase() ?? "")}`}>
                                {getLanguageIcon(item.language?.toLowerCase() ?? "")}
                            </span>
                        )}
                        <span className="text-sm flex-1 truncate">{item.name}</span>
                    </div>
                </ContextMenuTrigger>

                <ContextMenuContent className="bg-[#2d2d30] border-gray-700">
                    <ContextMenuItem className="text-gray-300 hover:bg-gray-700 hover:text-white">
                        <Edit className="h-4 w-4 mr-2" /> Rename
                    </ContextMenuItem>
                    <ContextMenuItem className="text-gray-300 hover:bg-gray-700 hover:text-white">
                        <Copy className="h-4 w-4 mr-2" /> Copy
                    </ContextMenuItem>
                    <ContextMenuItem className="text-gray-300 hover:bg-gray-700 hover:text-white">
                        <Download className="h-4 w-4 mr-2" /> Download
                    </ContextMenuItem>
                    <ContextMenuItem className="text-red-400 hover:bg-red-600 hover:text-white">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            {item.type === FileTypeEnum.Folder &&
                item.children &&
                expandedFolders.has(item.id) && (
                    <div>
                        {renderFileTree(
                            item.children,
                            depth + 1,
                            expandedFolders,
                            setExpandedFolders
                        )}
                    </div>
                )}
        </div>
    ))
}

export default renderFileTree
