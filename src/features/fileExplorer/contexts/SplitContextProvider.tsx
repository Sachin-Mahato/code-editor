import { useCallback, useMemo, useState } from "react";
import SplitContext from "./SplitContext";

export default function SplitContextProvider({ children }: { children: React.ReactNode }) {
    const [previewMode, setPreviewMode] = useState<"split" | "preview" | "code">("split");

    const { showCode, showPreview } = useMemo(() => {
        const showCode = previewMode === "code" || previewMode === "split";
        const showPreview = previewMode === "preview" || previewMode === "split";
        return { showCode, showPreview };
    }, [previewMode]);

    const handlePreview = useCallback((mode: "split" | "preview" | "code") => {
        setPreviewMode(mode);
    }, []);

    const value = useMemo(() => ({
        previewMode,
        showCode,
        showPreview,
        handlePreview
    }), [previewMode, showCode, showPreview, handlePreview]);

    return <SplitContext.Provider value={value}>{children}</SplitContext.Provider>;
}
