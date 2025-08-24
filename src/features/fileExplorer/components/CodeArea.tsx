import { useRef } from "react";
import useResize from "../hooks/useResize";
import Workspace from "@/features/editor/components/Workspace";
import CodePreview from "./CodePreview";
import PreviewSection from "./PreviewSection";
import WorkspaceContainer from "@/features/editor/components/WorkspaceContainer";

const ContentArea = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const { splitRatio, handleMouseDown, handleDividerDoubleClick } = useResize(containerRef)

    return (
        <div
            className="flex flex-1 min-h-0 overflow-hidden"
            ref={containerRef}
            data-testid="code-area"
        >

            <CodePreview
                splitRatio={splitRatio}
                children={
                    <WorkspaceContainer
                        children={<Workspace />} />
                }
            />

            <PreviewSection
                splitRatio={splitRatio}
                onMouseDown={handleMouseDown}
                onDoubleClick={handleDividerDoubleClick}
            />
        </div>
    );
};


export default ContentArea;