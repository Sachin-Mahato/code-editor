import { RouteObject } from "react-router";
import EditorContainer from "./view/EditorContainer";
export const codeRoutes: RouteObject[] = [
    {
        path: "/code",
        Component: EditorContainer,
    },
];
