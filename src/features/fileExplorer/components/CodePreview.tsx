import React from "react";
import useSplit from "../contexts/useSplit";

interface CodePreviewProps {
    children: React.ReactNode
    splitRatio: number
}
const CodePreview: React.FC<CodePreviewProps> = ({ splitRatio, children }) => {
    const { previewMode } = useSplit()

    const widthStyle = {
        width: previewMode === 'split' ? `${splitRatio}%` : '100%',
    };

    return (
        <div
            className="min-w-0 overflow-hidden bg-[#1e1e1e] flex flex-col"
            style={widthStyle}>
            {children}
        </div>
    );
};

export default CodePreview;