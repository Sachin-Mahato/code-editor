import { Editor, OnMount } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import useFileContext from "../../hooks/useFileContext";
import useResize from "../../hooks/useResize";
import Tabs from "./Tabs";
interface WorkspaceProps {
    id: string
    lang: string;
    val: string;
}

const Workspace = ({  id, lang, val, }: WorkspaceProps) => {
    const { editorVal, editorHandleChange ,} = useFileContext();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const refRight = useRef<HTMLDivElement | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editorRef = useRef<any>(null);

    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    useEffect(() => {
        editorRef.current?.focus()
    }, []);

    useResize(containerRef, refRight)

    return (
        <div
            className="flex flex-col relative max-w-full h-[100dvh]"
            ref={containerRef}
        >
            <Tabs
             />
            <div
                ref={refRight}
                className="absolute h-full right-0 top-0 w-2 cursor-col-resize z-10"
            >

            </div>
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
    );
};

export default Workspace;
