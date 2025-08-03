import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from 'vitest';
import LandingPage from "@/components/landingPage/LandingPage";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import AuthProvider from '@/contexts/auth/authContextProvider';
import * as useAuthModule from '@/contexts/auth/useAuth';
import * as useFeaturesModule from '@/hooks/useFeatures';
import * as useStorageModule from '@/hooks/useStorage';
import * as useUserDetailsModule from '@/hooks/useUserDetails';

vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

describe("Landing Page", () => {
    it("should render all main sections", () => {
        // Mock the hooks
        vi.spyOn(useAuthModule, 'default').mockReturnValue({ isAuthenticated: false, setIsAuthenticated: vi.fn() });
        vi.spyOn(useFeaturesModule, 'useFeatures').mockReturnValue({
            features: [{ title: 'Feature 1', description: 'Description 1', icon: <div>Icon</div> }],
            benefits: [{ title: 'Benefit 1', description: 'Description 1', icon: <div>Icon</div> }]
        });
        vi.spyOn(useStorageModule, 'default').mockReturnValue({ token: "", saveToken: vi.fn() });
        vi.spyOn(useUserDetailsModule, 'default').mockReturnValue({ data: { id: "", username: "", email: "" }, isLoading: false, error: null });

        render(
            <MemoryRouter>
                <AuthProvider>
                    <LandingPage />
                </AuthProvider>
            </MemoryRouter>
        );

        expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
        expect(screen.getByLabelText('hero')).toBeInTheDocument(); // HeroSection
        expect(screen.getByTestId('featuresSection')).toBeInTheDocument(); // FeaturesSection
        expect(screen.getByTestId('authCTASection')).toBeInTheDocument(); // AuthCTASection
        expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer

        expect(screen.queryByTestId('try-dialog')).not.toBeInTheDocument();
    });
});