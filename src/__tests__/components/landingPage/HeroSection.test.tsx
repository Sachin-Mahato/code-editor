import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HeroSection from "@/pages/landingPage/HeroSection";
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';

describe("HeroSection", () => {
    it("Should display the Open Editor button when user is authenticated", () => {
        const mockSetShowTryModel = vi.fn();
        render(
            <MemoryRouter>
                <HeroSection isAuthenticated={true} setShowTryModal={mockSetShowTryModel} />
            </MemoryRouter>
        );

        const openEditorButton = screen.getByTestId("open-editor");
        expect(openEditorButton).toBeInTheDocument();

        const getStartedButton = screen.queryByText(/Get Started Free/i);
        expect(getStartedButton).not.toBeInTheDocument();

        const tryWithoutLoginButton = screen.queryByText(/Try without login/i);
        expect(tryWithoutLoginButton).not.toBeInTheDocument();
    });

    it("Should display Get Started Free and Try without login buttons when user is not authenticated", () => {
        const mockSetShowTryModel = vi.fn();
        render(
            <MemoryRouter>
                <HeroSection isAuthenticated={false} setShowTryModal={mockSetShowTryModel} />
            </MemoryRouter>
        )

        const getStartedButton = screen.getByText(/Get Started Free/i);
        expect(getStartedButton).toBeInTheDocument()

        const tryWithoutLoginButton = screen.getByText(/Try Without Login/i);
        expect(tryWithoutLoginButton).toBeInTheDocument();

        const openEditorButton = screen.queryByText(/Open Editor/i);
        expect(openEditorButton).not.toBeInTheDocument();
    })

    it("Should trigger setShowTryModal when Try without login button is clicked", async () => {
        const mockSetShowTryModel = vi.fn();

        render(
            <MemoryRouter>
                <HeroSection isAuthenticated={false} setShowTryModal={mockSetShowTryModel} />
            </MemoryRouter>
        );

        const tryWithoutLoginButton = screen.getByText(/Try Without Login/i);
        expect(tryWithoutLoginButton).toBeInTheDocument();

        await userEvent.click(tryWithoutLoginButton);
        expect(mockSetShowTryModel).toHaveBeenCalled();


    })
});
