import { FileTab } from "@/types/types";
import { createContext } from "react";

type tabContextTypes = {
    tabs: FileTab[];
    activeTab: string;
    switchTab: (id: string) => void;
    closeTab: (id: string) => void;
};

const TabContext = createContext<tabContextTypes | null>(null);

export default TabContext;
