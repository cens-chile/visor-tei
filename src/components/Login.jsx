// LoginForm.jsx
import { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/form-control';
import { getToken } from "../hooks/functions";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(''); 

    const token = await getToken(username, password);

    if (token) {
      localStorage.setItem('token', token.access);
      localStorage.setItem('refreshToken', token.refresh)
      localStorage.setItem('username', username);
      window.location.href = '/';
    } else {
      setErrorMsg('Usuario o contraseña incorrectos');
    }
  };

  return (
    <>
    <VStack spacing={3} mt="50px">
    <Heading textAlign="center" mt="50px" color={"#0069B2"}>Visor de transacciones TEI</Heading>
    <Box w="full" maxW="md" mx="auto" mt="20px" p="6" borderWidth="1px" borderRadius="lg" boxShadow="lg" 
    _dark={{
      bg: "gray.700",
      color: "white"
    }}
    _light={{
      bg: "#ffffff",
      color: "black"
    }}
    >
      <Heading mb="4" mx="auto" width="50%">Iniciar sesión</Heading>
      <form onSubmit={handleLogin}>
        <VStack spacing="4">
          <FormControl isInvalid={!!errorMsg}>
            <FormLabel>Usuario</FormLabel>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl isInvalid={!!errorMsg}>
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <FormErrorMessage>{errorMsg}</FormErrorMessage>
          </FormControl>
          <Button type="submit" 
            _dark={{
              bg: "gray.700",
              color: "white",
              _hover: { bg: "gray.600" },
            }}
            _light={{
              bg: "#006FB3",
              color: "white",
              _hover: { bg: "#0083d3" },
            }}  
            width="full"
          >
          Ingresar
          </Button>
        </VStack>
      </form>
    </Box>
    </VStack>
    </>
  );
}
