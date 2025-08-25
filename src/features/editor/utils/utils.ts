interface EditorOptions {
    minimap: { enabled: boolean };
    fontSize: number;
    fontFamily: string;
    lineHeight: number;
    padding: { top: number; bottom: number };
    scrollBeyondLastLine: boolean;
    smoothScrolling: boolean;
    cursorBlinking: "blink" | "smooth" | "phase" | "expand" | "solid";
    renderLineHighlight: "none" | "gutter" | "line" | "all";
    bracketPairColorization: { enabled: boolean };
    wordWrap: "off" | "on" | "wordWrapColumn" | "bounded";
    automaticLayout: boolean;
    tabSize: number;
    insertSpaces: boolean;
    useTabStops: boolean;
    detectIndentation: boolean;
    formatOnPaste: boolean;
    formatOnType: boolean;
}

export const editorOptions: EditorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    fontFamily: "Fira Code, Consolas, Courier New, monospace",
    lineHeight: 1.5,
    padding: { top: 8, bottom: 8 },
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    cursorBlinking: "smooth",
    renderLineHighlight: "all",
    bracketPairColorization: { enabled: true },
    wordWrap: "on",
    automaticLayout: true,
    tabSize: 4,
    insertSpaces: true,
    useTabStops: true,
    detectIndentation: false,
    formatOnPaste: true,
    formatOnType: true,
};
