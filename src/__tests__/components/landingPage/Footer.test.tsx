import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from "@/components/landingPage/Footer";
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router';

describe("Footer", () => {

    it("Should render the footer component without errors", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByText("CodeEditor")).toBeInTheDocument();
        expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
        expect(screen.getByText("Terms of Service")).toBeInTheDocument();
        expect(screen.getByText("Contact")).toBeInTheDocument();
        expect(screen.getByText("© 2025 CodeEditor. All rights reserved.")).toBeInTheDocument();
    });
});
