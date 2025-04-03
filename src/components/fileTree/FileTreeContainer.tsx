import FileTreeContextProvider from "../../context/FileContext"
import { FileTreeParent } from "./FileTreeParent"

const FileTreeContainer = () => {
    return (
        <FileTreeContextProvider>

            <FileTreeParent />
        </FileTreeContextProvider>
    )
}

export default FileTreeContainer