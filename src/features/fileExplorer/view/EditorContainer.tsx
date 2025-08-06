import { FileContextProvider } from "@/core/store/file/FileContextProvider"
import { FileTreeLayout } from "../components/FileTreeLayout"
import { TabsProvider } from "@/features/editor/tabs/TabContextProvider"
const EditorContainer = () => {
    return (
        <div
            role="region"
            aria-label="File Tree Container"
            data-testid="file-tree-container">

            <FileContextProvider>
                <TabsProvider>

                    <FileTreeLayout />
                </TabsProvider>

            </FileContextProvider>


        </div>
    )
}

export default EditorContainer;