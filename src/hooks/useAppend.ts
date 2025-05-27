import React, { useEffect } from "react";
import { cssFileType } from "../types/types";
export default function useAppend(cssFiles: cssFileType[], prevRef:React.RefObject<HTMLDivElement | null>) {
    useEffect(() => {
        const isActive = cssFiles.some((f) => f.isOpen);
        if (!isActive) {
            return;
        }
        // const container = document.body.querySelector('[role="preview"]');
        const container = prevRef.current;
        if (!container) return;

        const style = document.createElement("style");
        style.textContent = cssFiles.map((ele) => ele.content).join("");
        container.prepend(style);

        // Remove only the style element on cleanup
        return () => {
            container.removeChild(style);
        };
    }, [cssFiles,prevRef]);
}
