import useFileContext from "../../hooks/useFileContext";
import LivePreview from "../livePreview/LIvePreview";
import Workspace from "../workspace/Workspace";
import FileExplorer from "./FileExplorer";

export const FileTreeLayout = () => {
    const { fileList,htmlFiles } = useFileContext()
    return (
        <div className="grid grid-cols-[20%_50%_30%] grid-rows-1">
            <FileExplorer />

            {
                Array.isArray(fileList) && fileList.length > 0 ?
                    fileList.map(file => (
                        file.isOpen ?
                            <Workspace
                                key={file.fileId}
                                title={file.fileName}
                                id={file.fileId}
                                lang={file.language}
                                val={file.content}
                            />
                            : []
                    )) : []
            }
            <section role="region" aria-label="Live Preview">
                {

                    htmlFiles.length > 0 ?
                        htmlFiles.map(file => (
                            <LivePreview
                                key={file.fileId}
                                htmlValue={file.content}
                            />
                        ))
                        : []

                }
            </section>
        </div>
    );
};
