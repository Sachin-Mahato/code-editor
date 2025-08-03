import FileTreeContainer from "@/components/fileTree/FileTreeContainer";
import { TabsProvider } from "./contexts/tabs/TabContextProvider";
export default function App() {

    return (
        <TabsProvider>

            <FileTreeContainer />
        </TabsProvider>

    )
}

