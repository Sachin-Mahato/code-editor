import useFileContext from "../../hooks/useFileContext";
import Workspace from "../workspace/Workspace";
import FileExplorer from "./FileExplorer";

export const FileTreeLayout = () => {
    const { activeFiles } = useFileContext()

    console.log("activeFiles",activeFiles)
    return (
        <div className="grid grid-cols-[20%_80%]">
            <FileExplorer />
            {
                Array.isArray(activeFiles) && activeFiles.length > 0 ?
                    activeFiles.map(file => (
                        file.isActive ?
                            <Workspace key={file.id} title={file.name} id={file.id} />
                            : null
                    )) : null 
            }
        </div>
    );
};