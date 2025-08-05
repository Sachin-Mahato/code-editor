import type { RouteObject } from "react-router";
import LoginPage from "@/features/auth/view/LoginPage";
import SignupPage from "./view/SignupPage";

export const authRoutes: RouteObject[] = [
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "/signup",
        Component: SignupPage,
    },
];
