import React from "react";
import useFileContext from "@/core/store/file/useFileContext";
import LivePreviewView from "./LivePreviewView";

interface LivePreviewProps {
    htmlValue: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({ htmlValue }) => {

    const { fileList } = useFileContext();

    const css = fileList
        .filter(file => file.language === "CSS")
        .map(file => file.sourceCode)
        .join("\n");
    return (
        <LivePreviewView
            htmlValue={htmlValue}
            css={css}
        />
    );
};

export default LivePreview;
