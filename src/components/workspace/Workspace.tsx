import { Editor, type OnMount } from "@monaco-editor/react"
import { useEffect, useRef } from "react"
import { Separator } from "@/components/ui/separator"
import useFileContext from "@/contexts/file/useFileContext"

interface WorkspaceProps {
    id: string
    lang: string
    val: string
}

const Workspace = ({ id, lang, val }: WorkspaceProps) => {
    const { editorVal, editorHandleChange } = useFileContext()
    const editorRef = useRef<any>(null)

    const handleEditorDidMount: OnMount = (editorInstance) => {
        editorRef.current = editorInstance
        editorInstance.focus()
    }

    useEffect(() => {
        editorRef.current?.focus()
    }, [])


    return (
        <div className="flex flex-col w-full h-full bg-[#1e1e1e] overflow-hidden">
            {/* Editor area - maximized space */}
            <div className="flex-1 relative bg-[#1e1e1e] overflow-hidden min-h-0">
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


            {/* Compact status bar */}
            <div className="flex items-center justify-between px-3 py-1 bg-[#007acc] text-white text-xs flex-shrink-0 h-6">
                <div className="flex items-center gap-3">
                    <span>Line 1, Column 1</span>
                    <Separator orientation="vertical" className="h-2.5 bg-white/30" />
                    <span>UTF-8</span>
                    <Separator orientation="vertical" className="h-2.5 bg-white/30" />
                    <span>{lang}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-white/80">Go Live</span>
                </div>
            </div>
        </div>
    )
}

export default Workspace
