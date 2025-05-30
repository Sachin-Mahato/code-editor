import useFileContext from "../../hooks/useFileContext";
import LivePreview from "../livePreview/LIvePreview";
import Workspace from "../workspace/Workspace";
import FileExplorer from "./FileExplorer";

export const FileTreeLayout = () => {
    const { tabs,htmlFiles } = useFileContext()
        
    return (
        <div className="grid grid-cols-[auto_2fr_1fr] grid-rows-1">
            <FileExplorer />

            {
                Array.isArray(tabs) && tabs.length > 0 ?
                    tabs.map(file => (
                        file.isOpen ?   
                            <Workspace
                                key={file.fileId}
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
