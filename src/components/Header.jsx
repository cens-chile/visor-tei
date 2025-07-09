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
        <Flex align="center" mb={10} p={4} borderRadius="md" >
            <Image src={Logo_Minsal} alt="Logo" h="6rem" mt={2} />
            <Heading alignContent="center" className='header' ml={4}>Visor de mensajes</Heading>
            <Spacer/>
            {userName && (
            <Flex align="center" gap={4}>
                <Text fontSize="md">
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