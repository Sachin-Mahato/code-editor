import React, { useState } from "react"
import TopBar from "./TopBar"
import ExplorerPanel from "./ExplorerPanel"
import TabsArea from "@/features/fileExplorer/view/TabArea"
import useTab from "@/features/editor/tabs/useTab"

type LayoutProps = {
    Code: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ Code }) => {
    const { tabs } = useTab()
    const [isExplorerCollapsed, setIsExplorerCollapsed] = useState(false)

    return (
        <div
            className="flex flex-col h-screen w-full bg-gray-900 overflow-hidden"
        >
            <TopBar
                isExplorerCollapsed={isExplorerCollapsed}
                onToggleExplorer={() => setIsExplorerCollapsed(!isExplorerCollapsed)}
            />

            <div className="flex flex-1 min-h-0 overflow-hidden">
                <ExplorerPanel isCollapsed={isExplorerCollapsed} />

                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    {tabs.length > 0 && <TabsArea />}

                    {Code}
                </div>
            </div>
        </div>
    )
}

export default Layout;