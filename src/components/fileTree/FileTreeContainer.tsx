import FileTreeContextProvider from "../../context/FileContextProvider"
import { FileTreeLayout } from "./FileTreeLayout"

const FileTreeContainer = () => {
    return (
        <div
            role="region"
            aria-label="File Tree Container"
            data-testid="file-tree-container">

            <FileTreeContextProvider >

                <FileTreeLayout />
            </FileTreeContextProvider>
        </div>
    )
}

export default FileTreeContainer