import { TabsDispatchContext } from "@/contexts/tabContext";
import { useContext } from "react";

export default function useTabsDispatch() {
    const context = useContext(TabsDispatchContext);
    if (!context)
        throw new Error("useTabsDispatch must be used within TabsProvider");
    return context;
}
