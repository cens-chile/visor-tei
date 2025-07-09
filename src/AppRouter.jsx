import { Box } from "@chakra-ui/react";
import { LightMode } from "./components/ui/color-mode"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageTitle from "./PageTitle";
import ProtectedRoute from "./ProtectedRoute";
import Index from "./components/Index";
import Login from "./components/Login";

const router = createBrowserRouter([
    {
        path: "/", 
        element: (
            <>
                <PageTitle title="Visor | Inicio"/>
                <ProtectedRoute>
                    <LightMode>
                        <Index />
                    </LightMode>
                </ProtectedRoute>
            </>
        ),
    },
    {
        path: "/login",
        element: (
          <>
            <PageTitle title="Visor TEI | Inicio de Sesión" />
            <LightMode>
                <Box>
                    <Login/>
                </Box>
            </LightMode>
          </>
        ),
    }
])

export default function AppRouter() {
    return <RouterProvider router={router} />;
}