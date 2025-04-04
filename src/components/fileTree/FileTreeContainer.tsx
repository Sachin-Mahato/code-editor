import FileTreeContextProvider from "../../context/FileContext"
import { FileTreeLayout } from "./FileTreeLayout"

const FileTreeContainer = () => {
    return (
        <FileTreeContextProvider>

            <FileTreeLayout />
        </FileTreeContextProvider>
    )
}

export default FileTreeContainer