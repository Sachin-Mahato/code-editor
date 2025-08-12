import { Editor, type OnMount, } from "@monaco-editor/react";
import React, { useEffect, useRef, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { useActionDispatchers } from "@/core/store/file/useFileActionDispatcher";

interface WorkspaceProps {
    id: string;
    lang: string;
    val: string;
}

const Workspace: React.FC<WorkspaceProps> = ({
    id,
    lang,
    val
}) => {
    const { handleEditorChange } = useActionDispatchers()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editorRef = useRef<any>(null);
    // Stable mount handler using useCallback
    const handleEditorDidMount: OnMount = useCallback((editorInstance) => {
        editorRef.current = editorInstance;
        editorInstance.focus();
    }, []);

    // Focus editor on mount
    useEffect(() => {
        editorRef.current?.focus();
    }, []);

    return (
        <div
            className="flex flex-col w-full h-full bg-[#1e1e1e] overflow-hidden"
            role="main"
        >
            <div className="flex-1 relative bg-[#1e1e1e] overflow-hidden min-h-0">
                <Editor
                    height="100%"
                    width="100%"
                    theme="vs-dark"
                    path={id}
                    language={lang}
                    defaultValue={val}
                    value={val}
                    onMount={handleEditorDidMount}
                    onChange={(value) => handleEditorChange(id, lang, value!)}
                    options={{
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
                    }}
                />
            </div>

            <footer
                className="flex items-center justify-between px-3 py-1 bg-[#007acc] text-white text-xs flex-shrink-0 h-6"
                aria-label="Editor status bar"
            >
                <div className="flex items-center gap-3">
                    <span>Line 1, Column 1</span>
                    <Separator orientation="vertical" className="h-2.5 bg-white/30" />
                    <span>UTF-8</span>
                    <Separator orientation="vertical" className="h-2.5 bg-white/30" />
                    <span>{lang}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="text-white/80 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                    >
                        Go Live
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Workspace;
