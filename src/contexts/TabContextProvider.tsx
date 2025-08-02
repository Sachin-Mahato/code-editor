import tabsReducer from "@/reducers/tabsReducer";
import { ReactNode, useReducer } from "react";
import { TabsContext, TabsDispatchContext } from "./tabContext";

export const TabsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tabs, dispatch] = useReducer(tabsReducer, []);
    return (
        <TabsContext.Provider value={tabs}>
            <TabsDispatchContext.Provider value={dispatch}>
                {children}
            </TabsDispatchContext.Provider>
        </TabsContext.Provider>
    );
};



