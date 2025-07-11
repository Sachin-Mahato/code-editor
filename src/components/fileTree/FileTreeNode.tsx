import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
} from "@/components/ui/context-menu"
import {
    Folder,
    FolderOpen,
    Edit,
    Copy,
    Download,
    Trash2,
} from "lucide-react"
import FileIcon from "@/components/fileTree/FileIcons"
import type { FileItem } from "@/types/types"
import { Badge } from "../ui/badge"

interface FileTreeNodeProps {
    item: FileItem
    depth: number
    expandedFolders: Set<string>
    onToggleFolder: (id: string) => void
}

export default function FileTreeNode({
    item,
    depth,
    expandedFolders,
    onToggleFolder,
}: FileTreeNodeProps) {
    const isOpen = expandedFolders.has(item.id)

    return (
        <div>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div
                        className="flex items-center gap-2 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer text-gray-300 hover:text-white transition-colors"
                        style={{ paddingLeft: depth * 16 + 8 }}
                        onClick={() =>
                            item.type === "folder" ? onToggleFolder(item.id) : undefined
                        }
                    >
                        {item.type === "folder" ? (
                            isOpen ? (
                                <FolderOpen className="h-4 w-4 text-blue-400" />
                            ) : (
                                <Folder className="h-4 w-4 text-blue-400" />
                            )
                        ) : (
                            <FileIcon language={item.language} />
                        )}

                        <span className="text-sm flex-1 truncate">{item.name}</span>

                        {item.type === "file" && item.language && (
                            <Badge variant="secondary" className="text-xs px-1 py-0 h-4">
                                {item.language}
                            </Badge>
                        )}
                    </div>
                </ContextMenuTrigger>

                <ContextMenuContent className="bg-[#2d2d30] border-gray-700">
                    <ContextMenuItem><Edit className="h-4 w-4 mr-2" />Rename</ContextMenuItem>
                    <ContextMenuItem><Copy className="h-4 w-4 mr-2" />Copy</ContextMenuItem>
                    <ContextMenuItem><Download className="h-4 w-4 mr-2" />Download</ContextMenuItem>
                    <ContextMenuItem className="text-red-400"><Trash2 className="h-4 w-4 mr-2" />Delete</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            {item.type === "folder" && isOpen && item.children && (
                <div>
                    {item.children.map((child) => (
                        <FileTreeNode
                            key={child.id}
                            item={child}
                            depth={depth + 1}
                            expandedFolders={expandedFolders}
                            onToggleFolder={onToggleFolder}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
