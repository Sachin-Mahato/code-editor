import React, { memo } from "react";
import LivePreview from "@/features/livePreview/components/LivePreview";
import Divider from "@/features/fileExplorer/components/Divider";
import PreviewContainer from "@/features/livePreview/components/PreviewContainer";
import useSplit from "../contexts/useSplit";

type PreviewSectionProps = {
    splitRatio: number;
    onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onDoubleClick: () => void;
};

const PreviewSection: React.FC<PreviewSectionProps> = ({ splitRatio, onMouseDown, onDoubleClick }) => {
    const { previewMode, showPreview } = useSplit();

    if (!showPreview) return null;

    return (
        <>
            {previewMode === "split" && (
                <Divider onMouseDown={onMouseDown} onDoubleClick={onDoubleClick} />
            )}

            <div
                className="min-w-0 overflow-hidden flex flex-col bg-white"
                style={{ width: previewMode === "split" ? `${100 - splitRatio}%` : "100%" }}
            >
                <PreviewContainer>
                    <LivePreview />
                </PreviewContainer>
            </div>
        </>
    );
};

export default memo(PreviewSection);
