import { useEffect } from "react";

export default function useDebounce(fn: unknown, delay: number) {
    if (typeof fn !== "function") {
        throw new TypeError("fn must be a function");
    }
    useEffect(() => {
        const id = setTimeout(() => {
           fn(); 
        },delay)

        return () => clearTimeout(id)
    },[fn,delay])
}