import { useContext } from "react";
import SplitContext from "./SplitContext";
export default function useSplit() {
    const ctx = useContext(SplitContext);

    if (!ctx) {
        throw new Error("Split context must be within the provider");
    }
    return ctx;
}
