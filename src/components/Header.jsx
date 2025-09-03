import { useState, useEffect } from 'react'
import { Button, Flex, Heading, Spacer, Text, Image} from "@chakra-ui/react";
import Logo_Minsal from "./icons/Logo_Minsal.png";
import { logout } from '../hooks/functions'

export default function Header() {

    const [userName, setUserName] = useState("");

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setUserName(username);
        }
    }, []);

    return(
        <Flex align="center" mb={10} p={4} borderRadius="md" minW={0} wrap="wrap">
            <Heading ml={4} flexShrink={1} minW={0} noOfLines={1} color={"#0069B2"} fontWeight={"bold"}>Visor de Transacciones TEI</Heading>
            <Spacer/>
            {userName && (
            <Flex align="center" gap={4} >
                <Text fontSize="md" whiteSpace="nowrap">
                Bienvenido, <strong>{userName}</strong>
                </Text>
                <Button 
                _light={{
                bg: "#FE6565",
                color: "white",
                _hover: { bg: "#fc2727" },
                }} 
                size="sm" onClick={logout}
                >
                Cerrar sesión
                </Button>
            </Flex>
            )}
        </Flex>
    )
}