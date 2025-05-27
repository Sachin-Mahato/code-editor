import useFileContext from "../../hooks/useFileContext";
import useAppend from "../../hooks/useAppend";
import { useRef } from "react";

interface Preview {
    htmlValue: string
}
const LivePreview = ({ htmlValue }: Preview) => {
    const prevRef = useRef<HTMLDivElement | null>(null);
    const { cssFiles } = useFileContext();
    useAppend(cssFiles,prevRef);


    return (
        <section
            className="w-full h-full"
            role="preview"
            ref={prevRef}
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