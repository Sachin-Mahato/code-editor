import { StrictMode, } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import AuthProvider from './core/store/auth/authContextProvider';


import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import App from './App'


const queryClient = new QueryClient();

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <HomePage />,
//         errorElement: <NotFoundPage />,
//     },
//     {
//         path: "/code",
//         element: (
//             <Suspense fallback={
//                 <div className="flex items-center justify-center h-screen">
//                     <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
//                 </div>
//             }
//             >
//                 <Code />
//             </Suspense >
//         ),

//         errorElement: <NotFoundPage />
//     },
//     {
//         path: "/signup",
//         element: <SignupPage />,

//         errorElement: <NotFoundPage />
//     },
//     {
//         path: "/login",
//         element: <LoginPage />,
//         errorElement: <NotFoundPage />
//     },

// ]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>

                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </QueryClientProvider>
        </AuthProvider>
    </StrictMode>,
)
