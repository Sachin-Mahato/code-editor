import { useState, memo } from "react"
import { Folder, FolderOpen } from "lucide-react"
import { getLanguageColor, getLanguageIcon } from "../utils/languageUtil"
import { useFileActionDispatchers } from "@/core/store/file/useFileActionDispatcher"

type Node = {
    name: string
    nodes?: Set<string>
}

const FileSystemTree = memo(({ node }: { node: Node }) => {
    const [expanded, setExpanded] = useState(true)
    const { openFileInWorkspace } = useFileActionDispatchers()
    const handleFileClick = (fileName: string) => {
        openFileInWorkspace(fileName)
    }

    return (
        <div>
            {/* Src Folder */}
            <div
                className="flex items-center gap-2 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer
                        text-gray-300 hover:text-white transition-colors"
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ?
                    <FolderOpen className="h-4 w-4 text-blue-400" /> :
                    <Folder className="h-4 w-4 text-blue-400" />
                }
                <span className="text-sm">src</span>
            </div>

            {/* Files inside src */}
            {expanded && node.nodes && (
                <div className="pl-4">
                    {Array.from(node.nodes).map((fileName) => (
                        <div
                            key={fileName}
                            className="flex items-center gap-2 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer
                                     text-gray-300 hover:text-white transition-colors"
                            onClick={() => handleFileClick(fileName)}
                        >
                            <span className={`text-sm cursor-default ${getLanguageColor(fileName.toLowerCase())}`}>
                                {getLanguageIcon(fileName.toLowerCase())}
                            </span>
                            <span className="text-sm">{fileName}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
})


export default FileSystemTree

