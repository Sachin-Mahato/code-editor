import TabsContainer from "@/components/workspace/TabContainer";
import useTab from "@/hooks/tabs/useTab";

export default function Tabs() {
    const { tabs, activeTab, switchTab, closeTab } = useTab();
    return (
        <TabsContainer
            tabs={tabs}
            activeTabId={activeTab}
            onSwitch={switchTab}
            onClose={closeTab}
        />
    );
}