import { useState } from "react";

export default function useCollapse() {
    const [isExplorerCollapsed, setIsExplorerCollapsed] = useState(false);

    const collapseHandler = () => {
        setIsExplorerCollapsed((prev) => !prev);
    };

    return { isExplorerCollapsed, collapseHandler };
}
