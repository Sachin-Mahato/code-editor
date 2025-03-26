import Workspace from "../workspace/Workspace"
import FileTree from "./FileTree"

export const FileTreeParent = () => (
    <div className="grid grid-cols-[20%_80%]">
        <FileTree />
        <Workspace />
    </div>
)
