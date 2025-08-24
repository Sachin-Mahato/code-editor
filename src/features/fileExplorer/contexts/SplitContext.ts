import { createContext } from "react";

type SplitContextTypes = {
    previewMode: string;
    showCode: boolean;
    showPreview: boolean;
    handlePreview: (mode: "code" | "split" | "preview") => void;
};

const SplitContext = createContext<SplitContextTypes | null>(null);

export default SplitContext;
