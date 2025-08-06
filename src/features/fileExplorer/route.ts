import { RouteObject } from "react-router";
import { lazy } from "react";

const EditorContainer = lazy(() => import("./view/EditorContainer"));

export const codeRoutes: RouteObject[] = [
    {
        path: "/code",
        Component: EditorContainer,
    },
];
