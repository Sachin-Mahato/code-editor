import { TabsContext } from "@/contexts/tabContext";
import { useContext } from "react";

export default function useTab() {
    const context = useContext(TabsContext);

    if (!context) throw new Error("Auth context must be within a provider");
    return context;
}