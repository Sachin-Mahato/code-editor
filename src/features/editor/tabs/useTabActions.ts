import { FileTab } from "../types/types";
import useTabsDispatch from "./useTabDispatch";

export default function useTabActions() {
    const dispatch = useTabsDispatch();

    const addTab = (tab: FileTab) =>
        dispatch({ type: "ADD_TAB", payload: tab });
    const closeTab = (id: string) =>
        dispatch({ type: "CLOSE_TAB", payload: id });
    const setTabs = (tabs: FileTab[]) =>
        dispatch({ type: "SET_TABS", payload: tabs });
    const switchTab = (id: string) =>
        dispatch({ type: "SWITCH_TAB", payload: id });

    return { addTab, closeTab, setTabs, switchTab };
}
