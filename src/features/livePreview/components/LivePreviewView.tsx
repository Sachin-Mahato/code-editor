
interface LivePreviewViewProps {
    readonly htmlValue: string;
    readonly css?: string

}
export default function LivePreviewView({ htmlValue, css, }: LivePreviewViewProps) {
    const doc = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>${css}</style>
</head>
<body>
  ${htmlValue}
</body>
</html>`;

    return (
        <iframe
            key={doc}
            title="Live preview"
            className="w-full h-full border-0 bg-white"
            style={{ minHeight: "100%" }}
            srcDoc={doc}
        />
    )
}



