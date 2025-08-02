import { TabsAction, TabsState } from "@/types/types";

export default function tabsReducer(
    state: TabsState,
    action: TabsAction,
): TabsState {
    switch (action.type) {
        case "SET_TABS":
            return action.payload;
        case "ADD_TAB":
            return [...state, action.payload];
        case "CLOSE_TAB":
            return state.filter((tab) => tab.id !== action.payload);
        default:
            return state;
    }
}
