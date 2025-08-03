import TabsContainer from "@/components/workspace/TabContainer";
import useTab from "@/contexts/tabs/useTab";

export default function Tabs() {
    const { tabs, activeTab, switchTab, closeTab } = useTab();

    // Map tabs to the expected format for TabContainer
    const mappedTabs = tabs.map(tab => ({
        fileId: tab.fileId,
        fileName: tab.fileName,
        language: tab.language,
        isModified: tab.isModified,
        isActive: tab.isActive
    }));

    return (
        <TabsContainer
            tabs={mappedTabs}
            activeTabId={activeTab}
            onSwitch={switchTab}
            onClose={closeTab}
        />
    );
}
