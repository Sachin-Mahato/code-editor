import useFileContext from "@/core/store/file/useFileContext";
import LivePreviewView from "./LivePreviewView";

const LivePreview = () => {
    const { fileList } = useFileContext();
    const htmlFiles = fileList
        .filter(f => f.language?.toUpperCase().trim() === "HTML".trim())

    const htmlValue = htmlFiles
        .map(f => f.sourceCode).join("\n");

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
