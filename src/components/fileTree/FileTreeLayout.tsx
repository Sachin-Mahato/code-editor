import useFileContext from "../../hooks/useFileContext";
import LivePreview from "../livePreview/LIvePreview";
import Workspace from "../workspace/Workspace";
import FileExplorer from "./FileExplorer";

export const FileTreeLayout = () => {
    const { fileList } = useFileContext()
    return (
        <div className="grid grid-cols-[20%_50%_30%]">
            <FileExplorer />

            {
                Array.isArray(fileList) && fileList.length > 0 ?
                    fileList.map(file => (
                        file.isActive ?
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
                    fileList.length > 0 ?
                        fileList.map(file => (
                            <LivePreview
                                key={file.fileId}
                                htmlValue={file.language === "html" ? file.content : ""}
                                lang={file.language}
                            />
                        ))
                        : []
                }
            </section>
        </div>
    );
};
