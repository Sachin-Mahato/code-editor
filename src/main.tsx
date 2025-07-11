import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from "@/components/landingPage/LandingPage.tsx"
import NotFoundPage from "@/components/landingPage/NotFoundPage.tsx"
import SignupPage from "@/components/auth/SignupPage.tsx"
import LoginPage from "@/components/auth/LoginPage.tsx"
import AuthProvider from './context/authContextProvider';
import { Loader2 } from 'lucide-react'

const Code = lazy(() => import("./App"));

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/code",
        element: (
            <Suspense fallback={
                <div className="flex items-center justify-center h-screen">
                    <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
                </div>
            }
            >
                <Code />
            </Suspense >
        ),

        errorElement: <NotFoundPage />
    },
    {
        path: "/signup",
        element: <SignupPage />,

        errorElement: <NotFoundPage />
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <NotFoundPage />
    },

]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>,
)
