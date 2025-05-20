import { useEffect } from "react"
import useFileContext from "../../hooks/useFileContext";

interface Preview {
    htmlValue: string
}
const LivePreview = ({ htmlValue }: Preview) => {
    const { cssFiles } = useFileContext();

    useEffect(() => {
        const isActive = cssFiles.some(f => f.isOpen);
        if (!isActive) {
            return;
        }
        const container = document.querySelector('[role="preview"]');
        if (!container) return;

        const style = document.createElement("style");
        style.textContent = cssFiles.map(ele => ele.content).join("");
        container.appendChild(style);

        // Remove only the style element on cleanup
        return () => {
            container.removeChild(style);
        };
    }, [cssFiles]);

    return (
        <section
            className="w-full h-full"
            role="preview"
        >
            <div>

                <div
                    dangerouslySetInnerHTML={{ __html: htmlValue }}

                ></div>
            </div>
        </section>
    )
}

export default LivePreview;