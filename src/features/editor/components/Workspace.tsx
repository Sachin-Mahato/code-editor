import { Separator } from "@/components/ui/separator";
import useFileContext from "@/core/store/file/useFileContext";
import useActive from "../hooks/useActive";
import { lazy } from "react";

const Editor = lazy(() => import("./Editor"))
const Workspace = () => {
    const { fileList, active } = useFileContext();
    const { id, lang, val } = useActive(fileList, active)

    console.log("hello from workspace")
    return (
        <div
            className="flex flex-col w-full h-full bg-[#1e1e1e] overflow-hidden"
            role="main"
        >

            <Editor
                id={id!}
                lang={lang!}
                val={val!}
            />

            <footer
                className="flex items-center justify-between px-3 py-1 bg-[#007acc] text-white text-xs flex-shrink-0 h-6"
                aria-label="Editor status bar"
            >
                <div className="flex items-center gap-3">
                    <span>Line 1, Column 1</span>
                    <Separator orientation="vertical" className="h-2.5 bg-white/30" />
                    <span>UTF-8</span>
                    <Separator orientation="vertical" className="h-2.5 bg-white/30" />
                    <span>{lang}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="text-white/80 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                    >
                        Go Live
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Workspace;
