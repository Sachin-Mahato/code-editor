import { ReactNode, useReducer } from "react";
import tabsReducer from "@/core/reducers/tabsReducer";
import { TabsContext, TabsDispatchContext } from "@/features/editor/tabs/tabContext";
import { TabsState } from "@/features/fileExplorer/types/types";

const initialState: TabsState = [];

export const TabsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tabs, dispatch] = useReducer(tabsReducer, initialState);

    return (
        <TabsContext.Provider value={tabs}>
            <TabsDispatchContext.Provider value={dispatch}>
                {children}
            </TabsDispatchContext.Provider>
        </TabsContext.Provider>
    );
};
