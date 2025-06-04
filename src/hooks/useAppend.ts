import { useEffect } from "react";
import { cssFileType } from "../types/types";

export default function useAppend(
    htmlValue: string,
    cssFiles: cssFileType[],
    prevRef: React.RefObject<HTMLDivElement | null>,
) {
    useEffect(() => {
        const host = prevRef.current;
        if (!host) return;

        // Only attach shadow root if it doesn't exist
        let shadow = host.shadowRoot;
        if (!shadow) {
            shadow = host.attachShadow({ mode: "open" });
        }
        shadow.innerHTML = htmlValue;

        const container = shadow;
        if (!container) return;

        const style = document.createElement("style");
        style.textContent = cssFiles.map((ele) => ele.content).join("");
        container.prepend(style);

        return () => {
            if (container.contains(style)) {
                container.removeChild(style);
            }
        };
    }, [htmlValue, cssFiles, prevRef]);
}

// useEffect(() => {
//     const isActive = cssFiles.some((f) => f.isOpen);
//     if (!isActive) {
//         return;
//     }
//     // const container = document.body.querySelector('[role="preview"]');
//     const container = prevRef.current;
//     if (!container) return;

//     const style = document.createElement("style");
//     style.textContent = cssFiles.map((ele) => ele.content).join("");
//     container.prepend(style);

//     // Remove only the style element on cleanup
//     return () => {
//         container.removeChild(style);
//     };
// }, [cssFiles,prevRef]);
