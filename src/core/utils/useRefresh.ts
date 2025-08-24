import { useCallback, useEffect, useRef } from "react";

export default function useRefresh(htmlValue: string, css: string) {
    const htmlRefValue = useRef(htmlValue);
    const cssRefValue = useRef(css);
    const latestHtmlRefValue = useRef(htmlValue);
    const latestCssRefValue = useRef(css);

    useEffect(() => {
        latestHtmlRefValue.current = htmlValue;
        latestCssRefValue.current = css;
    }, [htmlValue, css]);

    const refreshHandler = useCallback(() => {
        htmlRefValue.current = latestHtmlRefValue.current;
        cssRefValue.current = latestCssRefValue.current;
    }, []);

    return { refreshHandler, htmlRefValue, cssRefValue };
}
