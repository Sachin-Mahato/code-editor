import { useEffect, useRef } from "react"
import useFileContext from "../../hooks/useFileContext";

interface Preview  {
    htmlValue: string
    lang: string
}
const LivePreview = ({htmlValue,lang}:Preview) => {
    const prevRef = useRef<HTMLDivElement>(null);
    const {fileList} = useFileContext();

    useEffect(() => {
        const container = prevRef.current;
        let style: HTMLStyleElement | undefined;
        if (lang === "css" && container) {
            style = document.createElement("style");
            style.textContent = fileList.map(f => f.language === "css" ? f.content : "").join("");
            if (container.parentNode) {
                container.parentNode.appendChild(style);
            }
        }
        return () => {
            if (style) {
                style.remove();
            }
        }
    }, [lang, fileList])


    return (
        <div 
            className="w-full h-full" 
            role="preview"
        >
            <div
            dangerouslySetInnerHTML={{__html: htmlValue}}
            ref={prevRef}
            
            ></div>
        </div>
    )
}

export default LivePreview;