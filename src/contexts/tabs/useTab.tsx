import { useContext } from "react";
import { TabsContext, TabsDispatchContext } from "./tabContext";
import useTabActions from "./useTabActions";

export default function useTab() {
    const tabs = useContext(TabsContext);
    const dispatch = useContext(TabsDispatchContext);
    const { addTab, closeTab, setTabs, switchTab } = useTabActions();

    if (!tabs) {
        throw new Error("Tabs context must be within a provider");
    }

    if (dispatch === undefined) {
        throw new Error("Tabs dispatch context must be within a provider");
    }

    // Find the active tab
    const activeTab = tabs.find(tab => tab.isActive)?.fileId || "";

    return {
        tabs,
        activeTab,
        addTab,
        closeTab,
        setTabs,
        switchTab
    };
}
