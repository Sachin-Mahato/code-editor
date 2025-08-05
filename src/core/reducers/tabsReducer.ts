import { TabsAction, TabsState } from "@/features/fileExplorer/types/types";

export default function tabsReducer(
    state: TabsState,
    action: TabsAction,
): TabsState {
    switch (action.type) {
        case "SET_TABS":
            return action.payload;
        case "ADD_TAB":
            // If this is the first tab, make it active
            if (state.length === 0) {
                return [...state, { ...action.payload, isActive: true }];
            }
            // If there's already an active tab, the new tab is not active
            return [...state, { ...action.payload, isActive: false }];
        case "CLOSE_TAB":
            return state.filter((tab) => tab.fileId !== action.payload);
        case "SWITCH_TAB":
            return state.map((tab) => ({
                ...tab,
                isActive: tab.fileId === action.payload,
            }));
        default:
            return state;
    }
}
