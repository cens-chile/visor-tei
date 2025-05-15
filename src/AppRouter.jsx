import { Box, Heading } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageTitle from "./PageTitle";
import Index from "./components/Index";

const router = createBrowserRouter([
    {
        path: "/", 
        element: (
            <>
                <PageTitle title="Visor" />
                <Box maxW={1000} mx="auto" px={6} pt={24} fontSize="md">
                    <Heading mb={10}>Visor de mensajes</Heading>
                    <Index />
                </Box>
            </>
        ),
    }
])

export default function AppRouter() {
    return <RouterProvider router={router} />;
}