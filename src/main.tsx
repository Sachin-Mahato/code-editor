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
