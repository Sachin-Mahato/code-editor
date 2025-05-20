import { Editor, OnMount } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import useFileContext from "../../hooks/useFileContext";

interface WorkspaceProps {
    title: string;
    id: string;
    lang: string;
    val: string;
}

const Workspace = ({ title, id, lang, val, }: WorkspaceProps) => {
    const { editorVal, editorHandleChange } = useFileContext();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editorRef = useRef<any>(null);

    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    useEffect(() => {
        editorRef.current?.focus();
    }, []);


    return (
        <div className="flex flex-col">
            <p style={{backgroundColor: "#1f1f1f", color: "#fff", paddingBlockEnd: "1em", paddingInlineStart: "1em"}}>{title}</p>
            <Editor
                height="100%"
                width="100%"
                theme="vs-dark"
                path={id}
                language={lang}
                defaultValue={val}
                value={editorVal}
                onChange={(value) => editorHandleChange(value, id,lang)}
                onMount={handleEditorDidMount}
            />
        </div>
    );
};

export default Workspace;
