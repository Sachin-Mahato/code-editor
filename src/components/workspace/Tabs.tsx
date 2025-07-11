import TabsContainer from "@/components/workspace/TabContainer";
import useFileContext from "@/hooks/useFileContext";

export default function Tabs() {
    const { tabs, activeTab, switchTab, closeTab } = useFileContext()
    return (
        <TabsContainer
            tabs={tabs}
            activeTabId={activeTab}
            onSwitch={switchTab}
            onClose={closeTab}
        />
    );
}