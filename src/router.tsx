import { useRoutes } from "react-router";
import { authRoutes } from "./features/auth/route";
import LandingPage from "./pages/landingPage/LandingPage";
import { codeRoutes } from "./features/fileExplorer/route";

const HomePageRoutes = [
    {
        path: "/",
        element: <LandingPage />
    }
]

export const appRoutes = [...HomePageRoutes, ...authRoutes, ...codeRoutes]
export default function AppRouter() {
    const element = useRoutes(appRoutes);
    return element;
}