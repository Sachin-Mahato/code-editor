import useFileContext from "../../hooks/useFileContext";
import LivePreview from "../livePreview/LivePreview";
import Workspace from "../workspace/Workspace";
import FileExplorer from "./FileExplorer";

export const FileTreeLayout = () => {
    const { tabs, htmlFiles } = useFileContext()

    return (
        <div
            role="region"
            aria-label="File Tree Layout"
            className="grid grid-cols-[auto_1fr] h-screen w-full"
        >
            {/* Left Panel: Explore */}
            <aside >
                <FileExplorer />
            </aside>

            {/* Right Panel: Workspace + Live Preview */}
            <div className="grid grid-rows-[1fr_1fr]">
                {/* Top: Workspace */}
                <section className="overflow-auto">
                    {Array.isArray(tabs) && tabs.length > 0 &&
                        tabs.map(file =>
                            file.isOpen ? (
                                <Workspace
                                    key={file.fileId}
                                    id={file.fileId}
                                    lang={file.language}
                                    val={file.content}
                                />
                            ) : null
                        )
                    }
                </section>

                {/* Bottom: Live Preview */}
                <section role="region" aria-label="Live Preview" className="overflow-auto ">
                    {htmlFiles.length > 0 &&
                        htmlFiles.map(file => (
                            <LivePreview
                                key={file.fileId}
                                htmlValue={file.content}
                            />
                        ))
                    }
                </section>
            </div>
        </div>

    );
};
