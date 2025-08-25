import React from "react";
import useSplit from "@/features/fileExplorer/contexts/useSplit";
import useFileContext from "@/core/store/file/useFileContext";
import EmptyState from "@/features/fileExplorer/components/EmptyState";
import LivePreview from "./LivePreview";

type PreviewPaneProps = {
    splitRatio: number;
};

const PreviewPane: React.FC<PreviewPaneProps> = ({ splitRatio }) => {
    const { showPreview } = useSplit();
    const { fileList } = useFileContext();

    if (!showPreview) return null;

    const htmlFiles = (fileList ?? []).filter(
        (f) => f.language?.toUpperCase().trim() === "HTML"
    );

    const widthStyle = {
        width: !showPreview ? `${100 - splitRatio}%` : '100%',
    }


    return (
        <div
            className="min-w-0 overflow-hidden flex flex-col bg-white"
            style={widthStyle}
        >
            {htmlFiles.length > 0 ? (
                <LivePreview />
            ) : (
                <EmptyState
                    icon="🌐"
                    title="No HTML to preview"
                    subtitle="Select an HTML file to see the live preview"
                />
            )}
        </div>
    );
};

export default PreviewPane;
