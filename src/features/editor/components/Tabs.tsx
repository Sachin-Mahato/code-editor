import TabsContainer from "@/features/editor/components/TabContainer";
import useTab from "@/features/editor/tabs/useTab";

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
