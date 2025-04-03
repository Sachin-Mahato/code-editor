import React, { useState } from "react";

const Workspace = ({ title }: { title: string }) => {
    const [text, setText] = useState("")
    const [row, setRow] = useState(1)

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => 
        setText(e.target.value);

    const handleTextareaSize = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
         if(e.code === "Enter") {
             setRow(prev => prev + 1);
         } else if (e.code === "Tab") {
            e.preventDefault()
            const target = e.target as HTMLTextAreaElement;

            const start = target.selectionStart;
            const end = target.selectionEnd;

            // Insert 4 spaces at the cursor position
            target.value = target.value.substring(0, start) + "    " + target.value.substring(end);

            // Move the cursor to the right by 4 spaces
            target.selectionStart = target.selectionEnd = start + 4;
         }
    }

    return (
        <section className="max-w-full bg-[#1f1f1f] text-white">
            <div className="h-full">

                <h2>{title}</h2>
                <textarea
                defaultValue={text}
                onKeyDown={handleTextareaSize}
                onChange={handleTextareaChange}
                autoFocus placeholder="type of text..."
                rows={row}
                className="block w-full border-none outline-none resize-none  overflow-auto leading-normal"

                />
            </div>
        </section>
    )
}

export default Workspace;