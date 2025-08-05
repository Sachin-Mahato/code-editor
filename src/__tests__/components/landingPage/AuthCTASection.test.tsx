import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AuthCTASection from "@/pages/landingPage/AuthCTASection";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from 'react-router';
import { useFeatures } from '@/core/utils/useFeatures';
import LoginPage from '@/components/auth/LoginPage';
import SignupPage from '@/features/auth/view/SignupPage';
import userEvent from '@testing-library/user-event';

describe("AuthCTASection", () => {

    it("Should render all benefits provided in the 'benefits' prop", () => {
        const { benefits } = useFeatures()

        render(
            <MemoryRouter>
                <AuthCTASection isAuthenticated={false} benefits={benefits} />
            </MemoryRouter>
        );

        benefits.forEach((benefit) => {
            expect(screen.getByText(benefit.title)).toBeInTheDocument();
            expect(screen.getByText(benefit.description)).toBeInTheDocument();
        });

    });

    it("Should not display the CTA buttons when 'isAuthenticated' is true", () => {
        const { benefits } = useFeatures();

        render(
            <MemoryRouter>
                <AuthCTASection isAuthenticated={true} benefits={benefits} />
            </MemoryRouter>
        );

        const createFreeAccountButton = screen.queryByRole("link", { name: /Create Free Account/i });
        expect(createFreeAccountButton).not.toBeInTheDocument();

        const loginButton = screen.queryByRole("link", { name: /Sign In/i });
        expect(loginButton).not.toBeInTheDocument();

        expect(screen.getByText(/Save your work, keep Your Progress/i)).toBeInTheDocument();
        expect(screen.getByText(/Create an account to save your projects/i)).toBeInTheDocument();

    })

    it("Should display both 'Create Free Account' and 'Sign In' buttons when 'isAuthenticated' is false", () => {
        const { benefits } = useFeatures();

        render(
            <MemoryRouter>
                <AuthCTASection isAuthenticated={false} benefits={benefits} />
            </MemoryRouter>
        )
        const createFreeAccountButton = screen.getByRole("link", { name: /Create Free Account/i });
        expect(createFreeAccountButton).toBeInTheDocument();
        expect(createFreeAccountButton).toHaveAttribute("href", "/signup");


        const signButton = screen.getByRole("link", { name: /Sign In/i });
        expect(signButton).toBeInTheDocument();
        expect(signButton).toHaveAttribute("href", "/login");
    })

    it("Should use the correct routing links for the 'Create Free Account' and 'Sign In' buttons", () => {
        const { benefits } = useFeatures();

        render(
            <MemoryRouter>
                <AuthCTASection isAuthenticated={false} benefits={benefits} />
            </MemoryRouter>
        )

        const createFreeAccountButton = screen.getByRole("link", { name: /Create Free Account/i });
        expect(createFreeAccountButton).toBeInTheDocument();
        expect(createFreeAccountButton.closest("a")).toHaveAttribute("href", "/signup");

        const signButton = screen.getByRole("link", { name: /Sign In/i });
        expect(signButton).toBeInTheDocument();
        expect(signButton.closest("a")).toHaveAttribute("href", "/login");
    })

    it("Should correctly redirect to the signPage and LoginPage", async () => {
        const { benefits } = useFeatures();;
        render(
            <MemoryRouter initialEntries={["/"]}>
                <AuthCTASection isAuthenticated={false} benefits={benefits} />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </MemoryRouter>
        )

        const createFreeAccountButton = screen.getByRole("link", { name: /Create Free Account/i });
        expect(createFreeAccountButton).toBeInTheDocument();

        await userEvent.click(createFreeAccountButton);
        const signupPage = await screen.findByTestId("signupPage");
        expect(signupPage).toBeInTheDocument();

        const signButton = screen.getByRole("link", { name: /Sign In/i });
        expect(signButton).toBeInTheDocument();

        await userEvent.click(signButton);
        const loginPage = await screen.findByTestId("loginPage");
        expect(loginPage).toBeInTheDocument();
    })

});
