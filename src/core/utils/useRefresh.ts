import { useDeferredValue, useState } from "react";
import useFileContext from "../store/file/useFileContext";

export default function useRefresh() {
    const { fileList } = useFileContext();
    const htmlFiles = fileList.filter(
        (f) => f.language?.toUpperCase().trim() === "HTML".trim(),
    );

    const htmlValue = htmlFiles.map((f) => f.sourceCode).join("\n");

    const css = fileList
        .filter((file) => file.language === "CSS")
        .map((file) => file.sourceCode)
        .join("\n");

    const [previewCss, setPreviewCss] = useState(css);
    const [previewHtml, setPreviewHtml] = useState(htmlValue);

    const updatePreview = () => {
        setPreviewCss(css);
        setPreviewHtml(htmlValue);
    };

    const CSS = useDeferredValue(previewCss);
    const HTML = useDeferredValue(previewHtml);

    return {
        HTML,
        CSS,
        updatePreview,
        previewHtml,
        previewCss,
        htmlValue,
        css,
    };
}
