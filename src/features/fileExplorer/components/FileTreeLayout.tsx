import SplitContextProvider from "../contexts/SplitContextProvider"
import CodeArea from "./CodeArea"
import Layout from "./Layout"

export const FileTreeLayout = () => {

    return (
        <SplitContextProvider>
            <Layout Code={<CodeArea />} />
        </SplitContextProvider>
    )
}
