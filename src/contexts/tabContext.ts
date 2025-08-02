import { FileTab } from "@/types/types";
import { createContext } from "react";

type TabsState = FileTab[];
type TabsAction =
    | { type: "SET_TABS"; payload: FileTab[] }
    | { type: "ADD_TAB"; payload: FileTab }
    | { type: "CLOSE_TAB"; payload: string };

const TabsContext = createContext<TabsState | undefined>(undefined);
const TabsDispatchContext = createContext<
    React.Dispatch<TabsAction> | undefined
>(undefined);

export {
    TabsContext,
    TabsDispatchContext
}