import { render, screen, } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LandingPage from "@/components/landingPage/LandingPage";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from 'react-router';
import userEvent from "@testing-library/user-event"
import AuthProvider from '@/context/authContextProvider';
import LoginPage from '@/components/auth/LoginPage';
import SignupPage from '@/components/auth/SignupPage';

describe("Landing Page", () => {

    it("redirects to login page when Login button is clicked", async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </AuthProvider>
            </MemoryRouter>
        );

        const loginButtons = screen.getAllByTestId("login");

        loginButtons.forEach(button => {
            expect(button).toBeInTheDocument();
        })

        expect(loginButtons.length).toBeGreaterThan(0);

        await userEvent.click(loginButtons[0]);
        await userEvent.click(loginButtons[1]);

        const signUpPage = await screen.findByTestId("loginPage");
        expect(signUpPage).toBeInTheDocument();

    });
    it("redirects to sign page when Sign up button is clicked", async () => {

        render(
            <MemoryRouter initialEntries={['/']}>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                    </Routes>
                </AuthProvider>
            </MemoryRouter>
        );

        const signUpButton = await screen.findByTestId("signup")
        expect(signUpButton).toBeInTheDocument();
        await userEvent.click(signUpButton);
        const signUpPage = await screen.findByTestId("signupPage");
        expect(signUpPage).toBeInTheDocument();
    })
    it("redirect to sign up page when Get started free button is clicked", async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                    </Routes>
                </AuthProvider>
            </MemoryRouter>
        );

        const getStartedButton = screen.getByTestId("get-started");
        expect(getStartedButton).toBeInTheDocument();

        await userEvent.click(getStartedButton);
        const signUpButton = screen.getByTestId("signupPage");
        expect(signUpButton).toBeInTheDocument();

    })

    it("redirect to sign up page when create free account button is clicked", async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                    </Routes>
                </AuthProvider>
            </MemoryRouter>
        );

        const getStartedButton = screen.getByTestId("create-free-account");
        expect(getStartedButton).toBeInTheDocument();

        await userEvent.click(getStartedButton);
        const signUpButton = screen.getByTestId("signupPage");
        expect(signUpButton).toBeInTheDocument();

    })



});