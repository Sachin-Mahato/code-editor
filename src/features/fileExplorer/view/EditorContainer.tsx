import { FileContextProvider } from "@/core/store/file/FileContextProvider"
import { FileTreeLayout } from "../components/FileTreeLayout"

const EditorContainer = () => {
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

export default EditorContainer;