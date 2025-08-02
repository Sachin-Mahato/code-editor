import { FileTreeLayout } from "./FileTreeLayout"

const FileTreeContainer = () => {
    return (
        <div
            role="region"
            aria-label="File Tree Container"
            data-testid="file-tree-container">


            <FileTreeLayout />
        </div>
    )
}

export default FileTreeContainer