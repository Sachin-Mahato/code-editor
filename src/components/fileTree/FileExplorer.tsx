import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus, MoreHorizontal } from "lucide-react"
import useFileContext from "@/contexts/file/useFileContext"
import FileSystemTree from "./FileSystemTree"

interface Node {
    name: string
    nodes?: Node[]
}

const FileExplorer = () => {
    const { fileList } = useFileContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [folders, setFolders] = useState<Node[]>([]);

    useEffect(() => {
        if (fileList.length > 0) {
            // Convert each file into a Node
            const nodes: Node[] = fileList.map((f: any) => ({ name: f.fileName }));

            const folder: Node = {
                name: "src",
                nodes,
            };

            // Add this folder to the folders state
            setFolders((prev) => [...prev, folder]); // Or use [...prev, folder] if you want to append
        }
    }, [fileList]);

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
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                        <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                        <MoreHorizontal className="h-3 w-3" />
                    </Button>
                </div>
            </div>

            {/* File Tree */}
            <ScrollArea className="flex-1">
                <div className="py-1">
                    {
                        folders.map((f) => (
                            <FileSystemTree key={f.name} node={f} />
                        ))
                    }
                </div>
            </ScrollArea>
        </div>
    )
}

export default FileExplorer

