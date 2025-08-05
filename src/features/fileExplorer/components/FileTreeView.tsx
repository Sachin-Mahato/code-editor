import FileSystemTree from "@/features/fileExplorer/components/FileSystemTree"
import type { FileItem } from "@/features/fileExplorer/types/types"

interface FileTreeViewProps {
    items: FileItem[]
    searchTerm: string
    expandedFolders: Set<string>
    onToggleFolder: (id: string) => void
}

export default function FileTreeView({
    items,
    searchTerm,
    expandedFolders,
    onToggleFolder,
}: FileTreeViewProps) {
    const filterItems = (nodes: FileItem[]): FileItem[] =>
        nodes
            .filter((f) => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((f) =>
                f.type === "folder" && f.children
                    ? { ...f, children: filterItems(f.children) }
                    : f,
            )

    const visible = searchTerm ? filterItems(items) : items

    return (
        <div className="py-1">
            {visible.map((item) => (
                <FileSystemTree
                    key={item.id}
                    item={item}
                    depth={0}
                    expandedFolders={expandedFolders}
                    onToggleFolder={onToggleFolder}
                />
            ))}
        </div>
    )
}
