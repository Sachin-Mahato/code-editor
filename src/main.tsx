import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "@/App";

import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from "@/components/landingPage/LandingPage.tsx"
import NotFoundPage from "@/components/landingPage/NotFoundPage.tsx"
import SignupPage from "@/components/auth/SignupPage.tsx"
import LoginPage from "@/components/auth/LoginPage.tsx"
import AuthProvider from './context/authContextProvider';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFoundPage />
    },
    {
        path: "/code",
        element: <App />,

        errorElement: <NotFoundPage />
    },
    {
        path: "/signup",
        element: <SignupPage />,

    },
    {
        path: "/login",
        element: <LoginPage />
    },

]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>,
)
