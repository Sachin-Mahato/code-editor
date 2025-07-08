// import { useRef } from "react";
// import { FileIcon } from "../icons/index";
// import { FileList } from "./FileList";
// import useResize from "../../hooks/useResize";

// export default function FileExplorer() {
//     const refAside = useRef<HTMLDivElement | null>(null);
//     const refRight = useRef<HTMLDivElement | null>(null);
//     useResize(refAside, refRight);

//     return (
//         <div
//             ref={refAside}
//             className="relative bg-[#181818] max-w-full h-[100dvh] text-white"
//             style={{ width: 300 }} 
//         >
//             {/* Right resize handle */}
//             <div ref={refRight} className="absolute h-full w-2 right-0 top-0 cursor-col-resize z-10" />

//             {/* Content */}
//             <div className="h-full">
//                 {/* Header */}
//                 <div className="flex justify-between items-center px-4 py-3">
//                     <h2 className="text-lg font-semibold">Code Editor</h2>
//                     <div className="flex items-center space-x-2 cursor-pointer">
//                         <FileIcon />
//                     </div>
//                 </div>

//                 {/* File list */}
//                 <div className="px-4">
//                     <FileList />
//                 </div>
//             </div>
//         </div>
//     );
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Folder, FolderOpen, Plus, Search, MoreHorizontal, Trash2, Edit, Copy, Download } from "lucide-react"

interface FileItem {
    id: string
    name: string
    type: "file" | "folder"
    language?: string
    children?: FileItem[]
    isOpen?: boolean
}

const FileExplorer = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["root"]))

    // Mock file structure - replace with your actual file context
    const [files] = useState<FileItem[]>([
        {
            id: "src",
            name: "src",
            type: "folder",
            children: [
                { id: "index.html", name: "index.html", type: "file", language: "html" },
                { id: "style.css", name: "style.css", type: "file", language: "css" },
                { id: "script.js", name: "script.js", type: "file", language: "javascript" },
            ],
        },
        { id: "readme.md", name: "README.md", type: "file", language: "markdown" },
    ])

    const getFileIcon = (language?: string) => {
        const icons = {
            html: "🌐",
            css: "🎨",
            javascript: "⚡",
            typescript: "📘",
            json: "📄",
            markdown: "📝",
        }
        return icons[language as keyof typeof icons] || "📄"
    }

    const toggleFolder = (folderId: string) => {
        const newExpanded = new Set(expandedFolders)
        if (newExpanded.has(folderId)) {
            newExpanded.delete(folderId)
        } else {
            newExpanded.add(folderId)
        }
        setExpandedFolders(newExpanded)
    }

    const renderFileTree = (items: FileItem[], depth = 0) => {
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
                            onClick={() => (item.type === "folder" ? toggleFolder(item.id) : null)}
                        >
                            {item.type === "folder" ? (
                                expandedFolders.has(item.id) ? (
                                    <FolderOpen className="h-4 w-4 text-blue-400" />
                                ) : (
                                    <Folder className="h-4 w-4 text-blue-400" />
                                )
                            ) : (
                                <span className="text-sm">{getFileIcon(item.language)}</span>
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

                {item.type === "folder" && item.children && expandedFolders.has(item.id) && (
                    <div>{renderFileTree(item.children, depth + 1)}</div>
                )}
            </div>
        ))
    }

    return (
        <div className="flex flex-col h-full">
            {/* Search Bar */}
            <div className="p-2 border-b border-gray-700">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search files..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 bg-[#3e3e42] border-gray-600 text-gray-300 placeholder-gray-500 h-8"
                    />
                </div>
            </div>

            {/* File Actions */}
            <div className="flex items-center justify-between p-2 border-b border-gray-700">
                <span className="text-xs text-gray-400 uppercase tracking-wide">Files</span>
                <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700">
                        <Plus className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700">
                        <MoreHorizontal className="h-3 w-3" />
                    </Button>
                </div>
            </div>

            {/* File Tree */}
            <ScrollArea className="flex-1">
                <div className="py-1">{renderFileTree(files)}</div>
            </ScrollArea>
        </div>
    )
}

export default FileExplorer

