import TabContext from "@/context/tabContext";
import { useContext } from "react";

export default function useTab() {
    const context = useContext(TabContext);

    if (!context) throw new Error("Auth context must be within a provider");
    return context;
}