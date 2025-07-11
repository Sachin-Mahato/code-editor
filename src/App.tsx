import FileTreeContainer from "@/components/fileTree/FileTreeContainer";
import TabProvider from "./context/TabContextProvider";
export default function App() {

    return (
        <TabProvider>

            <FileTreeContainer />
        </TabProvider>

    )
}

