import React from "react";
import Divider from "@/features/fileExplorer/components/Divider";
import useSplit from "../contexts/useSplit";

type PreviewSectionProps = {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onDoubleClick: () => void;
};

const PreviewSection: React.FC<PreviewSectionProps> = ({ onMouseDown, onDoubleClick }) => {
    const { previewMode, showPreview } = useSplit();

    if (!showPreview) return null;

    return (
        <>
            {previewMode === "split" && (
                <Divider onMouseDown={onMouseDown} onDoubleClick={onDoubleClick} />
            )}

        </>
    );
};

export default PreviewSection;
