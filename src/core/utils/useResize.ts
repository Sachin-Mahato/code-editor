import React, { useEffect } from "react";

export default function useResize(
    container: React.RefObject<HTMLDivElement | null>,
    rightSide: React.RefObject<HTMLDivElement | null>,
): void {
    useEffect(() => {
        const resizable = container?.current;
        if (!resizable) return;
        const styles = globalThis.getComputedStyle(resizable);
        let width = parseInt(styles.width, 10);

        let x = 0;

        const onMouseRightResize = (e: MouseEvent) => {
            const dx = e.clientX - x;
            x = e.clientX;
            width = width + dx;
            resizable.style.width = `${width}px`;
        };

        const onMouseUpResize = () => {
            document.removeEventListener("mousemove", onMouseRightResize);
            document.removeEventListener("mouseup", onMouseUpResize);
        };

        const onMouseDownRight = (e: MouseEvent) => {
            x = e.clientX;
            resizable.style.right = "";
            document.addEventListener("mousemove", onMouseRightResize);
            document.addEventListener("mouseup", onMouseUpResize);
        };

        const resizeRight = rightSide?.current;
        if (resizeRight) {
            resizeRight.addEventListener("mousedown", onMouseDownRight);
        }

        return () => {
            if (resizeRight) {
                resizeRight.removeEventListener("mousedown", onMouseDownRight);
            }
        };
    }, [container, rightSide]);
}
