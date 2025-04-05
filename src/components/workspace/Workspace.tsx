import useFileContext from "../../hooks/useFileContext";

const Workspace = ({ title, id }: { title: string, id: string }) => {
    const { handleFileContentChange, activeFiles, handleTextareaSize} = useFileContext()

    const textValue = activeFiles.find(file => file.id === id)?.text || ""
    const row = activeFiles.find(file => file.id === id)?.row || 1

    console.log("text",activeFiles)

    return (
        <section className="max-w-full bg-[#1f1f1f] text-white">
            <div className="h-full">

                <h2 className="text-center">{title}</h2>
                <textarea
                defaultValue={textValue}
                onKeyDown={(e) => handleTextareaSize(e, id)}
                onChange={(e) =>  handleFileContentChange(e, id)}
                autoFocus placeholder="type of text..."
                rows={row}
                className="block w-full border-none outline-none resize-none  overflow-auto leading-normal"

                />
            </div>
        </section>
    )
}

export default Workspace;