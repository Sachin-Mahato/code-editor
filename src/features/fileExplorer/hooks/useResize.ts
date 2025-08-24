import { RefObject, useCallback, useEffect, useState } from "react";

export default function useResize(
    containerRef: RefObject<HTMLDivElement | null>,
) {
    const [isDragging, setIsDragging] = useState(false);
    const [splitRatio, setSplitRatio] = useState(50);

    const handleMouseDown = useCallback(() => {
        setIsDragging(true);
    }, []);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!containerRef.current || !isDragging) return;
            const rect = containerRef.current.getBoundingClientRect();
            const newRatio = ((e.clientX - rect.left) / rect.width) * 100;
            setSplitRatio(Math.max(10, Math.min(90, newRatio)));
        },
        [isDragging, containerRef],
    );

    const handleDividerDoubleClick = () => setSplitRatio(50);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";

            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
                document.body.style.cursor = "";
                document.body.style.userSelect = "";
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return {
        isDragging,
        splitRatio,
        handleMouseDown,
        handleDividerDoubleClick,
    };
}
