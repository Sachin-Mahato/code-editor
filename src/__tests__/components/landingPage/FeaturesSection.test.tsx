import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router';
import { useFeatures } from '@/hooks/useFeatures';
import FeaturesSection from '@/components/landingPage/FeatureSection';
import { Item } from '@/types/types';

describe("FeaturesSection", () => {
    it("Should render all features provided in the 'features' prop", () => {
        const { features } = useFeatures()

        render(
            <MemoryRouter>
                <FeaturesSection features={features} />
            </MemoryRouter>
        );

        expect(features).toHaveLength(4);
        features.forEach((feature, idx) => {
            const featureCard = screen.getByTestId(`feature-${idx}`);
            expect(featureCard).toBeInTheDocument();
            expect(featureCard.querySelector("svg")).toBeInTheDocument();
            expect(featureCard).toHaveTextContent(feature.title);
            expect(featureCard).toHaveTextContent(feature.description);
        })

    })
    it("Should not display anything when features is empty", () => {
        const features: Item[] = []

        render(
            <MemoryRouter>
                <FeaturesSection features={features} />
            </MemoryRouter>
        )

        expect(features).toHaveLength(0);

    })
})