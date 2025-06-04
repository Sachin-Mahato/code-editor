import { Editor, OnMount } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import useFileContext from "../../hooks/useFileContext";
import useResize from "../../hooks/useResize";
import Tabs from "./Tabs";

interface WorkspaceProps {
    id: string;
    lang: string;
    val: string;
}

const Workspace = ({ id, lang, val }: WorkspaceProps) => {
    const { editorVal, editorHandleChange } = useFileContext();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editorRef = useRef<any /* monaco.editor.IStandaloneCodeEditor */>(null);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const refRight = useRef<HTMLDivElement | null>(null);

    const handleEditorDidMount: OnMount = (editorInstance) => {
        editorRef.current = editorInstance;
        editorInstance.focus();
    };

    useEffect(() => {
        editorRef.current?.focus();
    }, []);

    useResize(containerRef, refRight);

    return (
        <div
            className="grid grid-rows-[10%_90%] w-full h-full bg-[#1e1e1e]" // default vs-dark background
            ref={containerRef}
        >
            {/* Tabs area */}
            <div className="overflow-hidden bg-[#1e1e1e]">
                <Tabs />
            </div>

            {/* Editor area */}
            <div className="relative w-full h-full bg-[#1e1e1e]">
                <Editor
                    height="100%"
                    width="100%"
                    theme="vs-dark"
                    path={id}
                    language={lang}
                    defaultValue={val}
                    value={editorVal}
                    onChange={(value) => editorHandleChange(value, id, lang)}
                    onMount={handleEditorDidMount}
                />
            </div>
        </div>


    );
};

export default Workspace;
