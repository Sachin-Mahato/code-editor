import { FileContextProvider } from "@/contexts/file/FileContextProvider"
import { FileTreeLayout } from "./FileTreeLayout"

const FileTreeContainer = () => {
    return (
        <div
            role="region"
            aria-label="File Tree Container"
            data-testid="file-tree-container">

            <FileContextProvider>

                <FileTreeLayout />
            </FileContextProvider>


        </div>
    )
}

export default FileTreeContainer