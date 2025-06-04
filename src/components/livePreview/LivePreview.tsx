import useFileContext from "../../hooks/useFileContext";
import useAppend from "../../hooks/useAppend";
import React, { useRef } from "react";

interface Preview {
    htmlValue: string;
}

const LivePreview: React.FC<Preview> = ({ htmlValue }) => {
    const prevRef = useRef<HTMLDivElement | null>(null);
    const { cssFiles } = useFileContext();
    useAppend(htmlValue, cssFiles, prevRef);
    
    return (
        <section
            className="max-w-full h-full"
            role="preview"
            ref={prevRef}
        >
            {/* Content will be rendered in shadow DOM, nothing needed here */}
        </section>
    );
};

export default LivePreview;