import { createContext } from "react";
import { FileTab } from "../types/types";

export type TabsState = FileTab[];
export type ActiveTabState = string | null;

export type TabsAction =
    | { type: "SET_TABS"; payload: FileTab[] }
    | { type: "ADD_TAB"; payload: FileTab }
    | { type: "CLOSE_TAB"; payload: string }
    | { type: "SWITCH_TAB"; payload: string };

const TabsContext = createContext<TabsState>([]);
const TabsDispatchContext = createContext<
    React.Dispatch<TabsAction> | undefined
>(undefined);

export { TabsContext, TabsDispatchContext };
