import { useRef, useMemo } from "react";
import useFileContext from "@/core/store/file/useFileContext";

interface LivePreviewProps {
  htmlValue: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({ htmlValue }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { cssFiles } = useFileContext();

  const css = useMemo(() => cssFiles.map(file => file.content).join("\n"), [cssFiles]);

  const srcDoc = useMemo(() => `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>${css}</style>
      </head>
      <body>
        ${htmlValue}
      </body>
    </html>
  `, [css, htmlValue]);

  return (
    <iframe
      ref={iframeRef}
      title="Live Preview"
      srcDoc={srcDoc}
      sandbox="allow-scripts allow-same-origin"
      className="w-full h-full border-0 bg-white"
      style={{ minHeight: "100%" }}
    />
  );
};

export default LivePreview;
