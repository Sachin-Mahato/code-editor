// import useFileContext from "../../hooks/useFileContext";
// interface Preview {
//     htmlValue: string;
// }

// const LivePreview = ({ htmlValue }: Preview) => {
//     const { cssFiles } = useFileContext();
//     const css = cssFiles.map((f) => f.content).join("\n");

//     // Inject CSS into a <style> tag in the <head>
//     const srcDoc = `
//         <html>
//             <head>
//                 <style>${css}</style>
//             </head>
//             <body>
//                 ${htmlValue}
//             </body>
//         </html>
//     `;

//     return (
//         <iframe
//             title="Live Preview"
//             style={{ width: "100%", height: "100%", border: "none" }}
//             srcDoc={srcDoc}
//             sandbox="allow-scripts allow-same-origin"
//         />
//     );
// };

// export default LivePreview;




import useFileContext from "@/contexts/file/useFileContext";
import { useRef } from "react"

interface LivePreviewProps {
    htmlValue: string
interface LivePreviewProps {
    htmlValue: string
}

const LivePreview = ({ htmlValue }: LivePreviewProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    const LivePreview = ({ htmlValue }: LivePreviewProps) => {
        const iframeRef = useRef<HTMLIFrameElement>(null)

        const { cssFiles } = useFileContext();
        const css = cssFiles.map((f) => f.content).join("\n");

        const srcDoc = `
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${htmlValue}
            </body>
        </html>
    `;


        const css = cssFiles.map((f) => f.content).join("\n");

        const srcDoc = `
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${htmlValue}
            </body>
        </html>
    `;


        return (
            <iframe
                ref={iframeRef}
                className="w-full h-full border-0 bg-white"
                title="Live Preview"
                sandbox="allow-scripts allow-same-origin"
                style={{ minHeight: "100%" }}
                srcDoc={srcDoc}
            />
        )
    }
    <iframe
        ref={iframeRef}
        className="w-full h-full border-0 bg-white"
        title="Live Preview"
        sandbox="allow-scripts allow-same-origin"
        style={{ minHeight: "100%" }}
        srcDoc={srcDoc}
    />
    )
}

export default LivePreview

export default LivePreview
