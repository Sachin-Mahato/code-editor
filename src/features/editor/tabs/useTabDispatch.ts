import { useContext } from "react";
import { TabsDispatchContext } from "@/features/editor/tabs/tabContext";

export default function useTabsDispatch() {
    const context = useContext(TabsDispatchContext);
    if (context === undefined) {
        throw new Error("useTabsDispatch must be used within a <TabsProvider>");
    }
    return context;
}
