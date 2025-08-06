import { useRoutes } from "react-router";
import { authRoutes } from "./features/auth/route";
import LandingPage from "./pages/landingPage/LandingPage";
import { codeRoutes } from "./features/fileExplorer/route";
import NotFoundPage from "./core/layout/NotFoundPage";


export const appRoutes = [
    {
        path: "/",
        element: <LandingPage />,
        errorElement: <NotFoundPage />
    },
    ...codeRoutes,
    ...authRoutes
]
export default function AppRouter() {
    const element = useRoutes(appRoutes);
    return element;

}

