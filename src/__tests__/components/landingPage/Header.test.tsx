import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import Header from "@/pages/landingPage/Header";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from 'react-router';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/components/auth/LoginPage';
import SignupPage from '@/features/auth/view/SignupPage';


describe("Header", () => {
    it("Should display Login and Sign Up buttons when user is not logged in", () => {
        render(
            <MemoryRouter>
                <Header token={null} logout={vi.fn()} />
            </MemoryRouter>
        );

        const loginButton = screen.getByTestId("login");
        const signUpButton = screen.getByTestId("signup");

        expect(loginButton).toBeInTheDocument();
        expect(signUpButton).toBeInTheDocument();

        expect(screen.queryByTestId("logout")).not.toBeInTheDocument();
    });

    it("Should show welcome message with username when user is logged in", () => {
        const username = "Sachin Mahato";
        render(
            <MemoryRouter>
                <Header token="token" username={username} logout={vi.fn()} />
            </MemoryRouter>
        )

        const welcomeMessage = screen.getByText(`Welcome, ${username}`);
        expect(welcomeMessage).toBeInTheDocument();

        const logoutButton = screen.getByTestId("logout");
        expect(logoutButton).toBeInTheDocument();

        const loginButton = screen.queryByTestId("login");
        const signUpButton = screen.queryByTestId("signup");

        expect(loginButton).not.toBeInTheDocument();
        expect(signUpButton).not.toBeInTheDocument();
    })

    it("Should trigger logout function when logout button is clicked", async () => {
        const mockLogout = vi.fn();

        render(
            <MemoryRouter>
                <Header token="token" username="Test user" logout={mockLogout} />
            </MemoryRouter>
        );

        const logoutButton = screen.getByTestId("logout");
        expect(logoutButton).toBeInTheDocument();

        await userEvent.click(logoutButton);
        expect(mockLogout).toHaveBeenCalledTimes(1);
    })


    it("Should render login and sign up pages with correct routes", async () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Header token={null} username={null} logout={vi.fn()} />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </MemoryRouter>
        );

        const loginLink = screen.getByTestId("login");
        const signUpLink = screen.getByTestId("signup");

        expect(loginLink).toBeInTheDocument();
        expect(signUpLink).toBeInTheDocument();

        expect(screen.queryByTestId("logout")).not.toBeInTheDocument();

        const user = userEvent.setup();

        await user.click(loginLink);
        expect(await screen.findByTestId("loginPage")).toBeInTheDocument();

        await user.click(signUpLink);
        expect(await screen.findByTestId("signupPage")).toBeInTheDocument();
    });


});
