import { Box, Heading } from "@chakra-ui/react";
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
                    <Index />
                </ProtectedRoute>
            </>
        ),
    },
    {
        path: "/login",
        element: (
          <>
            <PageTitle title="Visor TEI | Inicio de Sesión" />
            <Box>
                <Login/>
            </Box>
          </>
        ),
    }
])

export default function AppRouter() {
    return <RouterProvider router={router} />;
}