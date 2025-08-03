import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import renderFileTree from "./RenderFileTree"
import { Search, Plus, MoreHorizontal } from "lucide-react"
import { FileItem, FileTypeEnum } from "@/types/types"
import useFileContext from "@/contexts/file/useFileContext"

const FileExplorer = () => {
    const { fileList } = useFileContext()
    const [searchTerm, setSearchTerm] = useState("")
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["root"]))

    const [files, setFiles] = useState<FileItem[]>([])

    useEffect(() => {
        if (!fileList?.length) return

        const mapped: FileItem[] = fileList.map(f => {
            const incomingName = (f as any).name    // if your context really gives you FileItem[]
                ?? (f as any).fileName               // or ApiFileResponse.fileName
                ?? ""

            return {
                id: f.id ?? "",               // default to "" or throw if missing
                name: String(incomingName),     // force it to a string
                type: FileTypeEnum.File,
                isOpen: false,
                children: [],                        // leaf
                language: f.language,
                sourceCode: f.sourceCode,
            }
        })

        setFiles(mapped)
    }, [fileList])

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
                <div className="py-1">
                    {renderFileTree(files, 0, expandedFolders, setExpandedFolders)}
                </div>
            </ScrollArea>
        </div>
    )
}

export default FileExplorer

