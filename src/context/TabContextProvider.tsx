import { FileTab } from "@/types/types";
import { useState } from "react";
import TabContext from "./tabContext";
export default function TabContextProvider({ children }: { children: React.ReactNode }) {
    const [tabs, setTabs] = useState<FileTab[]>([]);
    const [activeTab, setActiveTab] = useState<string>("");

    const switchTab = (id: string) => {
        setActiveTab(id);
    };

    const closeTab = (id: string) => {
        setTabs(tabs.filter(tab => tab.fileId !== id));
        if (activeTab === id && tabs.length > 1) {
            const nextTab = tabs.find(tab => tab.fileId !== id);
            if (nextTab) {
                setActiveTab(nextTab.fileId);
            } else {
                setActiveTab("");
            }
        }
    };

    return (
        <TabContext.Provider value={{ tabs, activeTab, switchTab: switchTab, closeTab: closeTab }}>
            {children}
        </TabContext.Provider>
    );

}