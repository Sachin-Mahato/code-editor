import { Editor, OnMount } from "@monaco-editor/react";
import { useCallback, useEffect, useRef } from "react";
import { editorOptions } from "../utils/utils";
import useFileContext from "@/core/store/file/useFileContext";
import { useFileActionDispatchers } from "@/core/store/file/useFileActionDispatcher";

interface CodeEditorProps {
    id: string;
    lang: string;
    val: string;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ id, lang, val }) => {
    const { handleEditorChange } = useFileActionDispatchers()
    const { editorContent } = useFileContext()

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

    return <div className="flex-1 relative bg-[#1e1e1e] overflow-hidden min-h-0">
        <Editor
            height="100%"
            width="100%"
            theme="vs-dark"
            path={id}
            language={lang.toLowerCase()}
            defaultValue={val}
            value={editorContent}
            onMount={handleEditorDidMount}
            onChange={(value) => handleEditorChange(id!, lang!, value!)}
            options={editorOptions}
        />
    </div>
}

export default CodeEditor;