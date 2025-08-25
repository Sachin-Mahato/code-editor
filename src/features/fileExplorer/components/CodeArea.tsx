import { useRef } from "react";
import useResize from "../hooks/useResize";
import CodePreview from "./CodePreview";
import PreviewSection from "./PreviewSection";
import WorkspaceContainer from "@/features/editor/components/WorkspaceContainer";
import Workspace from "@/features/editor/components/Workspace";
import PreviewPane from "@/features/livePreview/components/PreviewPane";

const ContentArea = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const { splitRatio, handleMouseDown, handleDividerDoubleClick } = useResize(containerRef)

    return (
        <div
            className="flex flex-1 min-h-0 overflow-hidden"
            ref={containerRef}
            data-testid="code-area"
        >

            <CodePreview splitRatio={splitRatio}>
                <WorkspaceContainer>

                    <Workspace />
                </WorkspaceContainer>
            </CodePreview>

            <PreviewSection
                onMouseDown={handleMouseDown}
                onDoubleClick={handleDividerDoubleClick}
            />

            <PreviewPane
                splitRatio={splitRatio}
            />
        </div>
    );
};


export default ContentArea;