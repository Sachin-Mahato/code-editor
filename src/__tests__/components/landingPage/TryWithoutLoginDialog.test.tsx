import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TryWithoutLoginDialog from "@/components/landingPage/TryWithoutLoginDialog";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from 'react-router';
import SignupPage from '@/components/auth/SignupPage';
import Workspace from '@/components/workspace/Workspace';
import userEvent from '@testing-library/user-event';

describe("TryWithoutLoginDialog", () => {

    it("Should render the dialog when 'open' prop is true", () => {
        const mockOpenChange = vi.fn();

        render(
            <MemoryRouter>
                <TryWithoutLoginDialog open={true} onOpenChange={mockOpenChange} />
            </MemoryRouter>
        )

        const dialog = screen.getByTestId("try-dialog");
        expect(dialog).toBeInTheDocument();

        const dialogTitle = screen.getByText(/Storage Requires Account/i);
        expect(dialogTitle).toBeInTheDocument();

        const createFreeAccountButton = screen.getByRole("link", { name: /Create Free Account/i })
        expect(createFreeAccountButton).toBeInTheDocument();
        expect(createFreeAccountButton).toHaveAttribute("href", "/signup")

        const continueWithoutSavingButton = screen.getByRole("link", { name: /Continue Without Saving/i })
        expect(continueWithoutSavingButton).toBeInTheDocument();
        expect(continueWithoutSavingButton).toHaveAttribute("href", "/code")
    })
    it("Should not display the dialog when 'open' prop is false", () => {
        const mockOpenChange = vi.fn();

        render(
            <MemoryRouter>
                <TryWithoutLoginDialog open={false} onOpenChange={mockOpenChange} />
            </MemoryRouter>
        )

        const dialog = screen.queryByTestId("try-dialog");
        expect(dialog).not.toBeInTheDocument();
    })

    it("Should redirect to signup and code page when buttons are clicked", async () => {
        const mockOpenChange = vi.fn();

        render(
            <MemoryRouter initialEntries={["/"]}>
                <TryWithoutLoginDialog open={true} onOpenChange={mockOpenChange} />
                <Routes>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/code" element={<div data-testid="code-area"></div>} />
                </Routes>
            </MemoryRouter >
        )

        const createFreeAccountButton = screen.getByRole("link", { name: /Create Free Account/i });
        await userEvent.click(createFreeAccountButton);
        const signupPage = await screen.findByTestId("signupPage");
        expect(signupPage).toBeInTheDocument();

        const continueWithoutSavingButton = screen.getByRole("link", { name: /Continue Without Saving/i });
        await userEvent.click(continueWithoutSavingButton);
        const codeArea = await screen.findByTestId("code-area");
        expect(codeArea).toBeInTheDocument();
    })
});
