import { useFeatures } from "@/hooks/useFeatures";
import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("useFeatures", () => {
    it("Should return 3 benefits", () => {
        const { result } = renderHook(useFeatures);
        expect(result.current.benefits).toBe(3);
    });
    it("Should return 4 features", () => {
        const { result } = renderHook(useFeatures);
        expect(result.current.features.length).toBe(4);
    });
});
