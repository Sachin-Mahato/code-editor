import React, { useRef, useEffect } from "react";
import useFileContext from "@/core/store/file/useFileContext";

interface LivePreviewProps {
    htmlValue: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({ htmlValue }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { fileList } = useFileContext();

    const css = fileList
        .filter(file => file.language === "CSS")
        .map(file => file.sourceCode)
        .join("\n");

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;

        // Clear previous content
        doc.body.innerHTML = '';
        doc.head.innerHTML = '';

        const styleEl = doc.createElement("style");
        styleEl.textContent = css;
        doc.head.appendChild(styleEl);

        const wrapper = doc.createElement("div");
        wrapper.innerHTML = htmlValue;
        doc.body.appendChild(wrapper);
    }, [htmlValue, css]);

    return (
        <iframe
            ref={iframeRef}
            title="Live Preview"
            sandbox="allow-scripts allow-same-origin"
            className="w-full h-full border-0 bg-white"
            style={{ minHeight: "100%" }}
        />
    );
};

export default React.memo(LivePreview);

