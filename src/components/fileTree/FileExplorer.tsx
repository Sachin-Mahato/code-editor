import { useRef } from "react";
import { FileIcon } from "../icons/index";
import { FileList } from "./FileList";
import useResize from "../../hooks/useResize";

export default function FileExplorer() {
    const refAside = useRef<HTMLDivElement | null>(null);
    const refRight = useRef<HTMLDivElement | null>(null);
    useResize(refAside, refRight);

    return (
        <div
            ref={refAside}
            className="relative bg-[#181818] max-w-full h-[100dvh] text-white"
            style={{ width: 300 }} 
        >
            {/* Right resize handle */}
            <div ref={refRight} className="absolute h-full w-2 right-0 top-0 cursor-col-resize z-10" />

            {/* Content */}
            <div className="h-full">
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3">
                    <h2 className="text-lg font-semibold">Code Editor</h2>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <FileIcon />
                    </div>
                </div>

                {/* File list */}
                <div className="px-4">
                    <FileList />
                </div>
            </div>
        </div>
    );
}
