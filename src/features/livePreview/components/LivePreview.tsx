import useRefresh from "@/core/utils/useRefresh";
import LivePreviewView from "./LivePreviewView";

const LivePreview = () => {
    const { CSS, HTML, updatePreview, previewHtml, htmlValue, previewCss, css } = useRefresh()

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
                <button
                    type="button"
                    onClick={updatePreview}
                    className="px-3 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                    disabled={previewHtml === htmlValue && previewCss === css}
                    title="Update preview (applies current HTML/CSS)"
                >
                    Update preview
                </button>
            </div>
            <div className="flex-1 min-h-0">
                <LivePreviewView htmlValue={HTML} cssValue={CSS} />
            </div>
        </div>
    );
};

export default LivePreview;
