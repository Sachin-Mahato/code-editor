import useFileContext from "../../hooks/useFileContext";
interface Preview {
    htmlValue: string;
}

const LivePreview = ({ htmlValue }: Preview) => {
    const { cssFiles } = useFileContext();
    const css = cssFiles.map((f) => f.content).join("\n");

    // Inject CSS into a <style> tag in the <head>
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
            title="Live Preview"
            style={{ width: "100%", height: "100%", border: "none" }}
            srcDoc={srcDoc}
            sandbox="allow-scripts allow-same-origin"
        />
    );
};

export default LivePreview;